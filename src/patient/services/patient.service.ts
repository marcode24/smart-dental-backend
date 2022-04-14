import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import { CreatePatientDto } from '../dtos/patient.dto';

import { Patient } from '../entities/patient.entity';
import { User } from 'src/user/entities/user.entity';

import { FamiliarService } from './familiar.service';

import { ISearchParams } from '../models/search.model';
import { Familiar } from '../entities/familiar.entity';

@Injectable()
export class PatientService {

  private optionsQuery: FindOptions = {
    include: [
      {
        model: User,
        attributes: ['id_user', 'name', 'last_name']
      },
      {
        model: Familiar
      }
    ],
  };

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

  async findAll(params: ISearchParams) {
    const optionsQuery = this.getOptionsQuery(params, true);
    return await this.patientModel.findAndCountAll(optionsQuery);
  }

  async findById(patientId: number) {
    const patientDb = await this.patientModel.findByPk(patientId, this.optionsQuery);
    if(!patientDb) {
      return new NotFoundException(`patient not found with id ${patientId}`);
    }
    return patientDb;
  }

  async findByUser(userId: number, params: ISearchParams) {
    const optionsQuery = this.getOptionsQuery(params, false, userId);
    return await this.patientModel.findAndCountAll(optionsQuery);
  }

  private getOptionsQuery(params: ISearchParams, isAdmin: boolean, userId?: number): FindOptions<any> {
    const { fullname } = params;
    if(fullname) {
      const search = `%${fullname.toString()}%`;
      this.optionsQuery = {
        ...this.optionsQuery,
        where: {
          id_user: userId,
          [Op.or]: {
            name: { [Op.like]: search },
            last_name: { [Op.like]: search },
          },
        }
      }
    } else {
      const { limit, offset } = params;
      this.optionsQuery = {
        ...this.optionsQuery,
        where: {
          id_user: userId
        },
        limit,
        offset
      }
    }
    (isAdmin) ? delete this.optionsQuery.where['id_user'] : '';
    return this.optionsQuery;
  }

}
