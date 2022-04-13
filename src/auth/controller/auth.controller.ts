import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';

import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }

}
