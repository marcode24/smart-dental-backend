import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  async create(@Body() payload: CreateServiceDto) {
    return this.serviceService.create(payload);
  }
}
