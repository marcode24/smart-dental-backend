import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";

import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const resp = await this.authService.validateUser(username, password);
    if(resp.msg) {
      const { msg } = resp;
      throw new UnauthorizedException((msg === 'user disabled') ? 'User disabled' : 'User or password are incorrect');
    }
    return resp;
  }

}
