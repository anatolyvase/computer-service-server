import { PartialType } from '@nestjs/mapped-types';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsUUID()
  repairmanId?: string;

  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
