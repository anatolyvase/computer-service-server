import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminsService } from 'src/admins/admins.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { DatabaseService } from 'src/database/database.service';
import { RepairmanService } from 'src/repairman/repairman.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from './decorators/roles.decorator';

interface ITokenPayload {
  id: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly adminsService: AdminsService,
    private readonly repairmanService: RepairmanService,
  ) {}

  public readonly ACCESS_TOKEN_EXPIRATION = '30m';
  public readonly REFRESH_TOKEN_EXPIRATION = '30d';

  async validateUser(hashedPassword: string, password: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
  }

  async userSignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const { id, password: hashedPass } =
      await this.usersService.findOneByEmail(email);
    await this.validateUser(hashedPass, password);

    return this.signTokens({ id, role: Role.USER });
  }

  async userSignUp(createUserDto: CreateUserDto) {
    const { id } = await this.usersService.create(createUserDto);
    return this.signTokens({ id, role: Role.USER });
  }

  async adminSignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const { id, password: hashedPass } =
      await this.adminsService.findOneByEmail(email);
    await this.validateUser(hashedPass, password);

    return this.signTokens({ id, role: Role.ADMIN });
  }

  async repairmanSignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const { id, password: hashedPass } =
      await this.repairmanService.findOneByEmail(email);
    await this.validateUser(hashedPass, password);

    return this.signTokens({ id, role: Role.REPAIRMAN });
  }
  // async repairmanSignUp(createUserDto: CreateUserDto) {
  //   const { id } = await this.repairmanService.create(createUserDto);
  //   return this.signTokens({ id, role: Role.REPAIRMAN });
  // }

  protected signTokens(payload: ITokenPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.ACCESS_TOKEN_EXPIRATION,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.REFRESH_TOKEN_EXPIRATION,
      }),
    };
  }

  async refresh(refresh_token: string) {
    try {
      const payload: ITokenPayload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_SECRET,
      });

      return this.signTokens({ id: payload.id, role: payload.role });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
