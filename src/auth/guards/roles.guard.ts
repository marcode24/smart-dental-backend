import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { IPayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if(!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { role } = request.user as IPayloadToken;
    const isAuth = roles.some(roleAllowed => roleAllowed === role);
    if(!isAuth) {
      throw new UnauthorizedException('You are not allowed for this action')
    }
    return isAuth;
  }
}
