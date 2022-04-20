import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';

import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

import { GetCurrentUserId } from '../decorators/get-current-user-id.decorator';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

import { Role } from '../enums/roles.enum';
import { UserService } from 'src/user/services/user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }

  @Public()
  @Get('code/:code')
  async validateCode(
    @Param('code') code: string
  ) {
    const isValid = await this.userService.validateCode(code);
    return { valid: isValid };
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('renew')
  refreshTokens(
    @GetCurrentUserId() userId: number,
  ) {
    return this.authService.renewToken(userId);
  }

}
