import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreatePatientDto } from '../dtos/patient.dto';
import { ISearchParams } from '../models/search.model';

import { PatientService } from '../services/patient.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientController {

  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll(
    @Query('name') name: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number
  ) {
    const optionsParams: ISearchParams = { fullname: name, limit, offset }
    return this.patientService.findAll(optionsParams);
  }

  @Roles(Role.ADMIN)
  @Get('patient/:patientId')
  findById(
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.patientService.findById(patientId);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/:idUser')
  findByUser(
    @Param('idUser', ParseIntPipe) userId: number,
    @Query('name') name: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number
    ) {
    const optionsParams: ISearchParams = { fullname: name, limit, offset }
    return this.patientService.findByUser(userId, optionsParams);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreatePatientDto) {
    return this.patientService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Patch('/:idPatient/newUser/:idUser')
  changeUser(
    @Param('idPatient', ParseIntPipe) patientId: number,
    @Param('idUser', ParseIntPipe) newUserId: number,
  ) {
    return this.patientService.changeUser(patientId, newUserId);
  }

}
