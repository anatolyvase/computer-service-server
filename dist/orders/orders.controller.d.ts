import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, user: any): Promise<{
        user: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: {
            city: string;
            state: string;
            country: string;
            address1: string;
            address2: string;
            zip: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        repairman: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        _count: {
            user: number;
            repairman: number;
            address: number;
            services: number;
        };
        services: {
            serviceId: string;
            count: number;
            orderId: string;
        }[];
    } & {
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    findAll(): Promise<({
        user: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: {
            city: string;
            state: string;
            country: string;
            address1: string;
            address2: string;
            zip: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        repairman: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        _count: {
            user: number;
            repairman: number;
            address: number;
            services: number;
        };
        services: {
            serviceId: string;
            count: number;
            orderId: string;
        }[];
    } & {
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        address: {
            city: string;
            state: string;
            country: string;
            address1: string;
            address2: string;
            zip: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        repairman: {
            password: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        _count: {
            user: number;
            repairman: number;
            address: number;
            services: number;
        };
        services: {
            serviceId: string;
            count: number;
            orderId: string;
        }[];
    } & {
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto, user: any): Promise<string>;
    remove(id: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    accept(id: string, repairman: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    decline(id: string, repairman: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    finish(id: string, repairman: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    start(id: string, repairman: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    cancel(id: string, user: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
}
