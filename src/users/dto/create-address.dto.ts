import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  city: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  state: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  country: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  address1: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  address2: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  zip: string;
}
