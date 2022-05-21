import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';

import { ChangeStatusAppointmentDto, CreateAppointmentDto } from '../dtos/appointment.dto';

import { AppointmentDetail } from '../entities/appointment-detail.entity';
import { Appointment } from '../entities/appointment.entity';
import { Record } from 'src/patient/entities/record.entity';
import { Patient } from 'src/patient/entities/patient.entity';

import { StatusAppointment } from '../enums/status-appointment.enum';

import { ISearchParams } from 'src/common/models/search.model';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(AppointmentDetail) private appointmentDetailModel: typeof AppointmentDetail
  ) {}

  async create(data: CreateAppointmentDto) {
    const { id_record, date } = data;
    data.date = date.split('T')[0];
    const { id_appointment } = await this.appointmentModel.create({ ...data });
    id_record.forEach(async id_record => {
      await this.appointmentDetailModel.create({ id_appointment, id_record: id_record })
    })
    return true;
  }

  async findByPatient(patientId: number, status: StatusAppointment) {
    status = status || StatusAppointment.PENDING;
    const optionsQuery: FindOptions = {
      where: {
        status,
        id_patient: patientId,
      },
      include: [ Record, Patient ]
    }
    return this.appointmentModel.findAll(optionsQuery);
  }

  async findByUser(id_user: number, status: StatusAppointment, optionsParams: ISearchParams) {
    status = status || StatusAppointment.PENDING;
    let { limit, offset, fullname, date } = optionsParams;
    limit = Number(limit) || 5;
    offset = Number(offset) || 0;
    let optionsQuery: FindOptions = {
      where: {
        status,
        id_user,
      },
      include: [ Record, Patient ],
      limit,
      offset,
    };

    let optionsQueryCount: FindOptions = { where: { status } };
    if(fullname) {
      const search = `%${fullname.toString().trim()}%`
      optionsQuery = {
        where: {
          ...optionsQuery.where,
        },
        include: [
          Record,
          {
            model: Patient,
            where: {
              [Op.or]: {
                name: { [Op.like]: search },
                last_name: { [Op.like]: search },
              },
            }
          }
        ]
      };
      return { appointments: await this.appointmentModel.findAll(optionsQuery) };
    }
    if(date) {
      optionsQuery = {
        ...optionsQuery,
        where: {
          ...optionsQuery.where,
          date: {
            [Op.gte]: date,
            [Op.lte]: date
          }
        },
      }
      const { limit, offset, include, ...rest } = optionsQuery;
      optionsQueryCount = { ...rest };
    }
    const [appointments, total] = await Promise.all([
      this.appointmentModel.findAll(optionsQuery),
      this.appointmentModel.count(optionsQueryCount),
    ])
    return { appointments, total };
  }

  async changeStatus(id_appointment: number, data: ChangeStatusAppointmentDto) {
    const appointmentFound = await this.appointmentModel.findByPk(id_appointment);
    if(!appointmentFound) {
      return new NotFoundException(`appointment not found with id ${id_appointment}`);
    }
    appointmentFound.status = data.status;
    return await appointmentFound.save();
  }

}
