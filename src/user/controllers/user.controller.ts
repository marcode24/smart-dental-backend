import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
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

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }



}
