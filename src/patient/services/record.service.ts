import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { Service } from 'src/service/entities/service.entity';
import { ServicesService } from 'src/service/services/services.service';
import { CreateRecordDto } from '../dtos/record.dto';
import { Record } from '../entities/record.entity';

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
    return await newRecord.save();
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
