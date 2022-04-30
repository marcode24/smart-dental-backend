import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppointmentController } from './controllers/appointment.controller';

import { AppointmentDetail } from './entities/appointment-detail.entity';
import { Appointment } from './entities/appointment.entity';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Appointment,
      AppointmentDetail
    ]),
  ],
  controllers: [
    AppointmentController
  ],
  providers: [AppointmentService]
})
export class AppointmentModule {}
