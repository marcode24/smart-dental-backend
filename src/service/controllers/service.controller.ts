import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateServiceDto, UpdateServiceDto } from '../dtos/service.dto';

import { ServicesService } from '../services/services.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('services')
export class ServicesController {

  constructor(
    private readonly serviceService: ServicesService
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateServiceDto) {
    return this.serviceService.create(payload);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('offset', ParseIntPipe) offset?: number,
  ) {
    return this.serviceService.findAll(name, limit, offset);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/:id')
  findById(@Param('id', ParseIntPipe) serviceId: number) {
    return this.serviceService.findById(serviceId);
  }

  @Roles(Role.ADMIN)
  @Patch('/:id')
  changeStatus(
    @Param('id', ParseIntPipe) serviceId: number,
    @Body('status') status: boolean
  ) {
    return this.serviceService.changeStatus(serviceId, status);
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) serviceId: number,
    @Body() payload: UpdateServiceDto,
  ) {
    return this.serviceService.update(serviceId, payload);
  }

}
