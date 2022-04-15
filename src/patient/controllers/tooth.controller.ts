import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateToothDto } from '../dtos/tooth.dto';

import { ToothService } from '../services/tooth.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tooth')
export class ToothController {

  constructor(
    private readonly toothService: ToothService,
  ) {}

  @Roles(Role.ADMIN, Role.DENTIST)
  @Post()
  create(@Body() payload: CreateToothDto) {
    return this.toothService.create(payload);
  }

}
