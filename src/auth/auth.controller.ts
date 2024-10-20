import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from 'src/auth/decorators/cookies.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateAccountPasswordDto } from 'src/users/dto/update-user-account.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { Public } from './decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // user
  @Public()
  @Post('users/sign-in')
  async userSignIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.userSignIn(signInDto);

    await this.setRefreshTokenCookie(refresh_token, response);
    return { access_token };
  }
  @Public()
  @Post('/users/sign-up')
  async userSignUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.userSignUp(createUserDto);

    await this.setRefreshTokenCookie(refresh_token, response);
    return { access_token };
  }

  @Patch('/users/change-password')
  updatePassword(
    @Body() passwordDto: UpdateAccountPasswordDto,
    @CurrentUser() user: any,
  ) {
    return this.usersService.changePassword(passwordDto, user.id);
  }

  // admin
  @Public()
  @Post('/admins/sign-in')
  async adminSignIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, access_token } =
      await this.authService.adminSignIn(signInDto);

    await this.setRefreshTokenCookie(refresh_token, response);

    return { access_token };
  }

  // repairman
  @Public()
  @Post('/repairman/sign-in')
  async repairmanSignIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, access_token } =
      await this.authService.repairmanSignIn(signInDto);

    await this.setRefreshTokenCookie(refresh_token, response);

    return { access_token };
  }

  @Get('refresh')
  async refresh(
    @Cookies('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, access_token } =
      await this.authService.refresh(refreshToken);

    await this.setRefreshTokenCookie(refresh_token, response);

    return { access_token };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');
    return 'Successfully logged out.';
  }

  private async setRefreshTokenCookie(
    refreshToken: string,
    response: Response,
  ) {
    const expiresIn = new Date();
    expiresIn.setDate(
      expiresIn.getDate() + parseInt(this.authService.REFRESH_TOKEN_EXPIRATION),
    );

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }
}
