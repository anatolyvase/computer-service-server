import { PaymentType } from '@prisma/client';
import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  services: string[];

  @IsUUID()
  addressId: string;

  @IsEnum(PaymentType)
  paymentType: string;
}
