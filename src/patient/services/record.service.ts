import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ServicesService } from 'src/service/services/services.service';

import { CreateRecordDto } from '../dtos/record.dto';

import { Record } from '../entities/record.entity';
import { Service } from 'src/service/entities/service.entity';

import { Status } from '../enums/status.enum';

@Injectable()
export class RecordService {

  constructor(
    @InjectModel(Record) private recordModel: typeof Record,
    private servicesService: ServicesService
  ) {}

  async create(data: CreateRecordDto) {
    const { id_service, quantity, realization_date } = data;
    let newRecord = new this.recordModel(data);
    const serviceDB = await this.servicesService.findById(id_service) as Service;
    newRecord.service_name = serviceDB.name;
    newRecord.price = serviceDB.price * quantity;
    newRecord.realization_date = realization_date;
    newRecord.status = Status.PENDING;
    return await newRecord.save();
  }

  async changeStatus(recordId: number, newStatus: string) {
    const recordDB = await this.recordModel.findByPk(recordId);
    const { status } = recordDB;
    if(status === Status.CANCELLED) {
      return new BadRequestException('you can not change status');
    }
    switch (newStatus) {
      case 'cancel':
        if(status === Status.PENDING_PAYMENT || status === Status.COMPLETED) {
          return new BadRequestException('you can not change status record');
        }
        recordDB.status = Status.CANCELLED;
        recordDB.cancel_date = new Date();
        break;
      case 'paid':
        if(status !== Status.PENDING_PAYMENT) {
          return new BadRequestException('must be pending payment to change status');
        }
        recordDB.status = Status.COMPLETED;
        recordDB.payment_date = new Date();
        break;
      case 'done':
        if(status !== Status.PENDING) {
          return new BadRequestException('must be pending to change status');
        }
        recordDB.status = Status.PENDING_PAYMENT;
        recordDB.completed_date = new Date();
        break;
      default:
        return new BadRequestException('must provide a valid status option');
    }
    return await recordDB.save();
  }

  // async findByPatient(patientId: number) {
  //   const optionsQuery: FindOptions = {
  //     where: {
  //       id_patient: patientId,
  //     }
  //   }
  //   return await this.recordModel.findAll(optionsQuery);
  // }

}
