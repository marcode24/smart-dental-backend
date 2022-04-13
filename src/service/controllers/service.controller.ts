import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateServiceDto } from '../dtos/service.dto';

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
    @Query('name') name: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string
  ) {
    return this.serviceService.findAll(name, +limit, +offset);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('/:id')
  findById(@Param('id', ParseIntPipe) serviceId: string) {
    return this.serviceService.findById(serviceId);
  }


}
