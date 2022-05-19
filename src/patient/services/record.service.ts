import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { ServicesService } from 'src/service/services/services.service';

import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';

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

}
