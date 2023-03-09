import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { Service } from 'src/service/entities/service.entity';

import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';
import { CreateToothDto, UpdateToothDto } from '../dtos/tooth.dto';
import { Record } from '../entities/record.entity';
import { Tooth } from '../entities/tooth.entity';
import { Status } from '../enums/status.enum';

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
              model: Service,
            },
          ],
        },
      ],
    };
    return await this.toothModel.findAll(optionsQuery);
  }

  async update(toothId: number, data: UpdateToothDto) {
    const toothFound = await this.toothModel.findByPk(toothId, {
      include: [
        {
          model: Record,
        },
      ],
    });
    if (!toothFound) {
      return new NotFoundException(`tooth not found with id: ${toothId}`);
    }
    const { id_service, distal, ligual, mesial, oclusal, vestibular } = data;
    if (toothFound.record.id_service !== id_service) {
      const payloadRecord: UpdateRecordDto = { id_service, quantity: 1 };
      const { id_record } = toothFound;
      await this.recordService.update(id_record, payloadRecord);
    }
    toothFound.distal = distal || false;
    toothFound.ligual = ligual || false;
    toothFound.mesial = mesial || false;
    toothFound.oclusal = oclusal || false;
    toothFound.vestibular = vestibular || false;
    return await toothFound.save();
  }
}
