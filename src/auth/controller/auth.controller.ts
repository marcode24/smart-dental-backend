import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }

  @Roles(Role.ADMIN, Role.DENTIST)
  @Get('renew')
  refreshTokens(
    @GetCurrentUserId() userId: number,
  ) {
    return this.authService.renewToken(userId);
  }

}
