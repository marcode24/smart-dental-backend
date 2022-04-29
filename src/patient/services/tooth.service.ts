import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { Status } from '../enums/status.enum';

import { CreateRecordDto } from '../dtos/record.dto';
import { CreateToothDto } from '../dtos/tooth.dto';

import { Service } from 'src/service/entities/service.entity';
import { Record } from '../entities/record.entity';
import { Tooth } from '../entities/tooth.entity';

import { RecordService } from './record.service';

@Injectable()
export class ToothService {

  constructor(
    @InjectModel(Tooth) private toothModel: typeof Tooth,
    private recordService: RecordService,
  ) {}

  async create(data: CreateToothDto) {
    const createRecord: CreateRecordDto = { ...data, quantity: 1, realization_date: new Date() };
    const recordCreated = await this.recordService.create(createRecord);
    const newTooth = new this.toothModel(data);
    newTooth.id_record = recordCreated.id_record;
    return await newTooth.save();
  }

  async findByPatient(patientId: number) {
    const optionsQuery: FindOptions = {
      where: {
        id_patient: patientId,
      },
      include: [
        {
          model: Record,
          where: {
            status: Status.PENDING,
          },
          include: [
            {
              model: Service
            }
          ]
        }
      ]
    }
    return await this.toothModel.findAll(optionsQuery);
  }

}
