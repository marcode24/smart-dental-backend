import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePatientDto } from '../dtos/patient.dto';

import { Patient } from '../entities/patient.entity';

import { FamiliarService } from './familiar.service';

@Injectable()
export class PatientService {

  constructor(
    @InjectModel(Patient) private patientModel: typeof Patient,
    private familiarService: FamiliarService,
  ) {}

  async create(data: CreatePatientDto) {

    const { id_familiar } = await this.familiarService.create({ ...data.familiar });
    data.id_familiar = id_familiar;
    const patientCreated = await this.patientModel.create({ ...data })
    return patientCreated;
  }

}
