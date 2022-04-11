import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  findAll() {
    return 'users works';
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }


}
