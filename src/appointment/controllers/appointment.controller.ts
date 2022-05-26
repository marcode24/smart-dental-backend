import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ISearchParams } from 'src/common/models/search.model';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { ChangeStatusAppointmentDto, CreateAppointmentDto } from '../dtos/appointment.dto';
import { StatusAppointment } from '../enums/status-appointment.enum';

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

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/patient/:patientID')
  findByPatient(
    @Param('patientID', ParseIntPipe) patientID: number,
    @Query('status') status: StatusAppointment
  ) {
    return this.appointmentService.findByPatient(patientID, status)
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/user/:userID')
  findByUser(
    @Param('userID', ParseIntPipe) userID: number,
    @Query('status') status: StatusAppointment,
    @Query('date') date: Date,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('fullname') fullname: string,
  ) {
    let newDate: string;
    let optionsParams: ISearchParams = { limit, offset, fullname }
    if(date) {
      newDate = date.toISOString().split('T')[0];
      optionsParams.date = newDate;
    }
    return this.appointmentService.findByUser(userID, status, optionsParams);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Patch('/:appointmentID')
  changeStatus(
    @Param('appointmentID', ParseIntPipe) appointmentID: number,
    @Body() payload: ChangeStatusAppointmentDto
  ){
    return this.appointmentService.changeStatus(appointmentID, payload)
  }

}
