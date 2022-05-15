import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
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
  async findById(@Param('id', ParseIntPipe) userId: number) {
    const resp = await this.userService.findById(userId);
    if(!resp.user) {
      return new NotFoundException(`user not found with id: ${userId}`);
    }
    return resp;
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @HttpCode(201)
  @Patch('/:id')
  changeStatus(
    @Param('id', ParseIntPipe) userId: number,
    @Body('status') status: boolean
  ) {
    return this.userService.setStatusUser(userId, status);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

}
