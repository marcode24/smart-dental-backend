import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateRecordDto } from '../dtos/record.dto';
import { CreateToothDto } from '../dtos/tooth.dto';

import { Tooth } from '../entities/tooth.entity';

import { RecordService } from './record.service';

@Injectable()
export class ToothService {

  constructor(
    @InjectModel(Tooth) private toothModel: typeof Tooth,
    private recordService: RecordService,
  ) {}

  async create(data: CreateToothDto) {
    const createRecord: CreateRecordDto = { ...data, quantity: 1 };
    const recordCreated = await this.recordService.create(createRecord);
    const newTooth = new this.toothModel(data);
    newTooth.id_record = recordCreated.id_record;
    return await newTooth.save();
  }

}
