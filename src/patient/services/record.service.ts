import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, QueryTypes, Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import { ServicesService } from 'src/service/services/services.service';

import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';

import { Record } from '../entities/record.entity';
import { Service } from 'src/service/entities/service.entity';

import { Status } from '../enums/status.enum';
import { IStatistics, IStatisticsDays } from 'src/common/models/statistics.model';
import { ISearchParamsStatistics } from 'src/common/models/search.model';

@Injectable()
export class RecordService {

  constructor(
    @InjectModel(Record) private recordModel: typeof Record,
    private servicesService: ServicesService
  ) {}

  async create(data: CreateRecordDto) {
    const { id_service, quantity } = data;
    let newRecord = new this.recordModel(data);
    const serviceDB = await this.servicesService.findById(id_service) as Service;
    newRecord.service_name = serviceDB.name;
    newRecord.price = serviceDB.price * quantity;
    newRecord.status = Status.PENDING;
    return await newRecord.save();
  }

  async changeStatus(recordId: number, newStatus: string) {
    const recordDB = await this.recordModel.findByPk(recordId);
    if(!recordDB) {
      return new NotFoundException(`record not found with id ${recordId}`);
    }
    const { status } = recordDB;
    if(status === Status.CANCELLED) {
      return new BadRequestException('you can not change status');
    }
    const newDate = new Date();
    const newTime = `${newDate.getHours()}:${newDate.getMinutes()}`;
    switch (newStatus) {
      case 'cancel':
        if(status === Status.PENDING_PAYMENT || status === Status.COMPLETED) {
          return new BadRequestException('you can not change status record');
        }
        recordDB.status = Status.CANCELLED;
        recordDB.cancel_date = newDate;
        recordDB.cancel_time = newTime;
        break;
      case 'paid':
        if(status !== Status.PENDING_PAYMENT) {
          return new BadRequestException('must be pending payment to change status');
        }
        recordDB.status = Status.COMPLETED;
        recordDB.payment_date = newDate;
        recordDB.payment_time = newTime;
        break;
      case 'done':
        if(status !== Status.PENDING) {
          return new BadRequestException('must be pending to change status');
        }
        recordDB.status = Status.PENDING_PAYMENT;
        recordDB.realization_date = newDate;
        recordDB.realization_time = newTime;
        break;
      default:
        return new BadRequestException('must provide a valid status option');
    }
    return await recordDB.save();
  }

  async findByPatient(patientId: number, filter: number) {
    const status = (filter === 1) ? [Status.PENDING, Status.PENDING_PAYMENT] : (filter === 2) ? [Status.CANCELLED, Status.COMPLETED] : [Status.PENDING];
    const optionsQuery: FindOptions = {
      where: {
        id_patient: patientId,
        status
      }
    }
    return await this.recordModel.findAll(optionsQuery);
  }

  async update(idRecord: number, data: UpdateRecordDto) {
    const { id_service, quantity } = data;
    const recordFound = await this.recordModel.findByPk(idRecord);
    if(!recordFound) {
      return new NotFoundException(`record not found with id: ${idRecord}`);
    }
    if(recordFound.status !== Status.PENDING) {
      return new BadRequestException('You can not update record, because it status is not pending');
    }
    const serviceDB = await this.servicesService.findById(id_service) as Service;
    if(serviceDB.id_service) {
      recordFound.id_service = serviceDB.id_service;
      recordFound.service_name = serviceDB.name;
      recordFound.quantity = quantity;
      recordFound.price = serviceDB.price * quantity;
      return await recordFound.save();
    }
    return 0;
  }

  async statistics(limit: number = 3) {
    const results = await this.recordModel.sequelize.query(`
    SELECT
      COUNT(r.id_service) as total_service,
      r.id_service,
      s.name,
      sum(r.price * r.quantity) as total
    FROM record r
    INNER JOIN service s ON s.id_service = r.id_service
    WHERE r.status = 'COMPLETED'
    GROUP BY s.id_service , r.service_name
    ORDER BY total_service DESC
    LIMIT :limit;
    `, {
      replacements: { limit },
      type: QueryTypes.SELECT
    });
    let newResults: IStatistics[] = [];
    results.forEach(res => {
      const newResult: IStatistics = {
        total_service: res['total_service'],
        id_service: res['id_service'],
        name: res['name'],
        total: Number(res['total']),
        statistics: [],
      }
      console.log({newResult});
      newResults.push(newResult);
    });
    for await(let res of newResults) {
      res.statistics = await this.statisticsByDays(res.id_service);
    }
    return newResults;
  }

  private async statisticsByDays(serviceID: number) {
    const results = await this.recordModel.sequelize.query(`
    SELECT
      COUNT(r.realization_date) as total,
      SUM(r.quantity) as total_quantity,
      r.id_service,
      r.realization_date
    FROM record r
    WHERE r.status = 'COMPLETED'
      AND id_service = :id_service
      AND r.realization_date > CURRENT_DATE - INTERVAL 7 DAY
    GROUP BY r.realization_date, r.id_service ;
    `, {
      replacements: { id_service: serviceID },
      type: QueryTypes.SELECT,
    });
    const newResults: IStatisticsDays[] = [];
    results.map(async(res) => {
      const newResult: IStatisticsDays = {
        total: res['total'],
        total_quantity: res['total_quantity'],
        id_service: res['id_service'],
        realization_date: res['realization_date'],
      };
      newResults.push(newResult);
    });
    return newResults;
  }

  async statisticsByDate(optionsParams: ISearchParamsStatistics) {
    const { limit, offset, option, type } = optionsParams
    const newLimit: number = limit || 10;
    const newOffset: number = offset || 0;
    const newOption: string = option || 'current';
    const newType: string = type || 'month';

    let sequelizeWhereQuery: any;
    switch (newType) {
      case 'month':
        let diff: any;
        const DFPaymentDate = Sequelize.fn('DATE_FORMAT', Sequelize.col('payment_date'), '%Y%m');
        if(newOption === 'current') {
          // SELECT * FROM record r  WHERE status = 'COMPLETED' AND DATE_FORMAT(r.payment_date , '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m');
          diff = Sequelize.fn('DATE_FORMAT', Sequelize.fn('CURDATE'), '%Y%m');
          sequelizeWhereQuery = Sequelize.where(DFPaymentDate, '=', diff);
        }
        if(newOption === 'last') {
          // SELECT * FROM record r  WHERE status = 'COMPLETED' AND PERIOD_DIFF( DATE_FORMAT(NOW(),'%Y%m'), DATE_FORMAT(r.payment_date ,'%Y%m') ) = 1;
          diff = Sequelize.fn('PERIOD_DIFF', Sequelize.fn('DATE_FORMAT', Sequelize.fn('NOW'), '%Y%m'), DFPaymentDate);
          sequelizeWhereQuery = Sequelize.where(diff, '=', 1);
        }
        break;
      default:
        return new BadRequestException('must provide a valid type option');
    }

    const optionsQuery: FindOptions = {
      where: {
        status: Status.COMPLETED,
        [Op.and] : [ sequelizeWhereQuery ],
      },
      limit: newLimit,
      offset: newOffset
    };
    const querySumColumns: any = Sequelize.fn('SUM', Sequelize.where(Sequelize.col('quantity'), '*', Sequelize.col('price')));
    const optionsQueryEarnings: FindOptions = {
      attributes: [ [ querySumColumns, 'total'] ],
      where: {
        status: Status.COMPLETED,
        [ Op.and ] : [ sequelizeWhereQuery ],
      },
    };
    const [records, totalRecords, earnings] = await Promise.all([
      this.recordModel.findAll(optionsQuery),
      this.recordModel.count(optionsQuery),
      this.recordModel.findAll(optionsQueryEarnings)
    ])
    return { records, earnings, total: totalRecords };
  }

}
