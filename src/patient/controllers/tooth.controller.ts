import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateToothDto } from '../dtos/tooth.dto';

import { ToothService } from '../services/tooth.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teeth')
export class ToothController {

  constructor(
    private readonly toothService: ToothService,
  ) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreateToothDto) {
    return this.toothService.create(payload);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/patient/:patientId')
  findByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ) {
    return this.toothService.findByPatient(patientId);
  }



}
