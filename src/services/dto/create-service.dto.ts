import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  description: string;
}
