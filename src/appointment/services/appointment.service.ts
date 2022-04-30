import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateAppointmentDto } from '../dtos/appointment.dto';

import { AppointmentDetail } from '../entities/appointment-detail.entity';
import { Appointment } from '../entities/appointment.entity';

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

}
