import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    console.log(data);
    if (!user) {
      return null;
    }

    console.log(user);

    return data ? user[data] : user;
  },
);
