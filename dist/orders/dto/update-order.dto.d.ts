import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    repairmanId?: string;
    status?: OrderStatus;
}
export {};