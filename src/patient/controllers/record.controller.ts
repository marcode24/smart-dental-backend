import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ISearchParamsStatistics } from 'src/common/models/search.model';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateRecordDto, UpdateRecordDto } from '../dtos/record.dto';
import { RecordService } from '../services/record.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreateRecordDto) {
    return this.recordService.create(payload);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Patch('/:recordId')
  changeStatus(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Query('status') newStatus: string,
  ) {
    return this.recordService.changeStatus(recordId, newStatus);
  }

  @Roles(Role.ADMIN)
  @Get('/statistics')
  getStatistics(@Query('limit', ParseIntPipe) limit: number) {
    return this.recordService.statistics(limit);
  }

  @Roles(Role.ADMIN)
  @Get('/statistics/date')
  getStatisticsDate(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('type') type: string,
    @Query('option') option: string,
  ) {
    const params: ISearchParamsStatistics = { limit, offset, type, option };
    return this.recordService.statisticsByDate(params);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/:patientId')
  findByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
    @Query('filter', ParseIntPipe) filter: number,
  ) {
    return this.recordService.findByPatient(patientId, filter);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Patch('/update/:recordId')
  updateRecord(
    @Param('recordId', ParseIntPipe) recordId: number,
    @Body() payload: UpdateRecordDto,
  ) {
    return this.recordService.update(recordId, payload);
  }
}
