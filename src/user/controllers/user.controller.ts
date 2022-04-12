import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  findAll(
    @Query('fullname') fullname: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string
  ) {
    return this.userService.findAll(fullname, +limit, +offset);
  }

  @Get('/:id')
  findById(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Patch('/:id')
  changeStatus(
    @Param('id') userId: string,
    @Body('status') status: boolean
  ) {
    return this.userService.setStatusUser(userId, status);
  }

  @Put('/:id')
  update(
    @Param('id') userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(+userId, payload);
  }

}
