import { Controller, Post, Body, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from 'src/auth/decorators/cookies.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // user
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

  // admin
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
