import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';

import { ChangeStatusAppointmentDto, CreateAppointmentDto } from '../dtos/appointment.dto';

import { AppointmentDetail } from '../entities/appointment-detail.entity';
import { Appointment } from '../entities/appointment.entity';
import { Record } from 'src/patient/entities/record.entity';
import { StatusAppointment } from '../enums/status-appointment.enum';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(AppointmentDetail) private appointmentDetailModel: typeof AppointmentDetail
  ) {}

  async create(data: CreateAppointmentDto) {
    const { id_record } = data;
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
      include: [ Record ]
    }
    return this.appointmentModel.findAll(optionsQuery);
  }

  async findByUser(id_user: number, status: StatusAppointment) {
    status = status || StatusAppointment.PENDING;
    const optionsQuery: FindOptions = {
      where: {
        status,
        id_user,
      },
      include: [ Record ]
    }
    return this.appointmentModel.findAll(optionsQuery);
  }

  async changeStatus(id_appointment: number, data: ChangeStatusAppointmentDto) {
    const appointmentFound = await this.appointmentModel.findByPk(id_appointment);
    if(!appointmentFound) {
      return new NotFoundException(`appointment not found with id ${id_appointment}`);
    }
    appointmentFound.status = data.status;
    console.log(appointmentFound);
    return await appointmentFound.save();
  }

}
