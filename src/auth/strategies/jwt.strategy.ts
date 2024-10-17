import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from '../decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }

  // async validate({ role, id }: any) {
  //   let user: any = null;
  //   switch (role) {
  //     case Role.ADMIN:
  //       user = await this.userService.findOne(id);
  //       return {
  //         ...user,
  //         role,
  //       };
  //     case Role.USER:
  //       user = await this.userService.findOne(id);
  //       return {
  //         ...user,
  //         role,
  //       };
  //     case Role.REPAIRMAN:
  //       user = await this.userService.findOne(id);
  //       return {
  //         ...user,
  //         role,
  //       };
  //     default:
  //       return null;
  //   }
  // }
}
