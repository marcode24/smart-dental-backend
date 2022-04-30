import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateAppointmentDto } from '../dtos/appointment.dto';

import { AppointmentService } from '../services/appointment.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentController {

  constructor(private readonly appointmentService: AppointmentService) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post('')
  create(@Body() payload: CreateAppointmentDto) {
    return this.appointmentService.create(payload);
  }

}
