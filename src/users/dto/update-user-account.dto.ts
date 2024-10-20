import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

class AccountPasswordDto {
  @IsString()
  password: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(64)
  newPassword: string;
}

export class UpdateAccountPasswordDto extends PartialType(AccountPasswordDto) {}
