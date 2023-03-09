import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ISearchParams } from 'src/common/models/search.model';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll(
    @Query('all') all: string,
    @Query('fullname') fullname?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    const optionsParams: ISearchParams = {
      fullname,
      limit,
      offset,
      all: all === 'true',
    };
    return this.userService.findAll(optionsParams);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) userId: number) {
    const resp = await this.userService.findById(userId);
    if (!resp.user) {
      return new NotFoundException(`user not found with id: ${userId}`);
    }
    return resp;
  }

  @Public()
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Roles(Role.ADMIN)
  @HttpCode(201)
  @Patch('/:id')
  changeStatus(
    @Param('id', ParseIntPipe) userId: number,
    @Body('status') status: boolean,
  ) {
    return this.userService.setStatusUser(userId, status);
  }

  @Roles(Role.ADMIN)
  @Patch('/changeCode/:idUser')
  changeCode(@Param('idUser', ParseIntPipe) userId: number) {
    return this.userService.changeCode(userId);
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }
}
