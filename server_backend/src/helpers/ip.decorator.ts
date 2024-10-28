import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ip = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers['x-real-ip'] == null ? req.ip : req.headers['x-real-ip'];
});
