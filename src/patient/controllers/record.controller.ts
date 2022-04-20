import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateRecordDto } from '../dtos/record.dto';

import { RecordService } from '../services/record.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('records')
export class RecordController {

  constructor(
    private readonly recordService: RecordService,
  ) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreateRecordDto) {
    return this.recordService.create(payload);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Patch('/:recordId')
  changeStatus(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Query('status') newStatus: string
  ) {
    return this.recordService.changeStatus(recordId, newStatus);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/:patientId')
  findByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Query('filter', ParseIntPipe) filter: number,
  ) {
    return this.recordService.findByPatient(patientId, filter);
  }

}
