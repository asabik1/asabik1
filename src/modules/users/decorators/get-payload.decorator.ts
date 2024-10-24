import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
