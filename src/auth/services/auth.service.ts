import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/services/user.service';
import { IPayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if(user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch) {
        const { password, ...response } = user;
        return response;
      }
    }
    return null;
  }

  async renewToken(userId: number) {
    const user = await this.userService.findById(userId);
    if(user) {
      return this.generateJWT(user as User);
    }
  }



  async generateJWT(user: User) {
    const { role, id_user } = user;
    const payload: IPayloadToken = { role, sub: id_user };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

}
