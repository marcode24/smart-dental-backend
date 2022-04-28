import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import { CreatePatientDto } from '../dtos/patient.dto';

import { Familiar } from '../entities/familiar.entity';
import { Patient } from '../entities/patient.entity';
import { User } from 'src/user/entities/user.entity';

import { FamiliarService } from './familiar.service';

import { ISearchParams } from '../models/search.model';

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
    @InjectModel(User) private userModel: typeof User,
    private familiarService: FamiliarService,
  ) {}

  async create(data: CreatePatientDto) {
    const { id_familiar } = await this.familiarService.create({ ...data.familiar });
    data.id_familiar = id_familiar;
    const patientCreated = await this.patientModel.create({ ...data })
    return patientCreated;
  }

  async findById(patientId: number) {
    const patientDb = await this.patientModel.findByPk(patientId, this.optionsQuery);
    if(!patientDb) {
      return new NotFoundException(`patient not found with id ${patientId}`);
    }
    return patientDb;
  }

  async findbyUserAndPatient(userID: number, patientID: number) {
    const patientFound = await this.patientModel.findOne({
      where: {
        id_patient: patientID,
        id_user: userID,
      }
    });
    if(!patientFound) {
      return new BadRequestException('You do not have access for this patient');
    }
    return { patient: patientFound }
  }

  async findAll(params: ISearchParams) {
    const optionsQuery = this.getOptionsQuery(params, true);
    return this.findPatients(optionsQuery);
  }

  async findByUser(userId: number, params: ISearchParams) {
    const optionsQuery = this.getOptionsQuery(params, false, userId);
    return this.findPatients(optionsQuery, userId);
  }

  private async findPatients(optionsQuery: FindOptions, id_user?: number) {
    let optionQueryActive: FindOptions = { where: { status: true } };
    let optionQueryInactive: FindOptions = { where: { status: false } };
    if(id_user) {
      optionQueryActive = { where: { id_user, status: true } };
      optionQueryInactive = { where: { id_user, status: false } };
    }
    const [ patients, totalActive, totalInactive ] = await Promise.all([
      this.patientModel.findAll(optionsQuery),
      this.patientModel.count(optionQueryActive),
      this.patientModel.count(optionQueryInactive),
    ])
    const data = { patients, totalActive, totalInactive };
    return data;
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

  async changeUser(patientId: number, newUserId: number) {
    const userFound = await this.userModel.findByPk(
      newUserId,
      {
        attributes: [ 'id_user' ]
      }
    );
    if(!userFound) {
      return new NotFoundException(`user not found with id: ${newUserId}`);
    }
    return await this.patientModel.update(
      {
        id_user: userFound.id_user,
      },
      {
        where: {
          id_patient: patientId
        }
      }
    );
  }

}
