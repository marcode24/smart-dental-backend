import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreatePatientDto } from '../dtos/patient.dto';

import { PatientService } from '../services/patient.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientController {

  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreatePatientDto) {
    return this.patientService.create(payload);
  }

}
