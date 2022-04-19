import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPayloadToken } from '../models/token.model';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IPayloadToken;
    return user.sub;
  },
);
