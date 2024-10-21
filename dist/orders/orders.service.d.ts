import { BasketService } from 'src/basket/basket.service';
import { DatabaseService } from 'src/database/database.service';
import { RepairmanService } from 'src/repairman/repairman.service';
import { ServicesService } from 'src/services/services.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    private readonly db;
    private readonly usersService;
    private readonly basketService;
    private readonly repairmanService;
    private readonly servicesService;
    constructor(db: DatabaseService, usersService: UsersService, basketService: BasketService, repairmanService: RepairmanService, servicesService: ServicesService);
    private readonly include;
    create(createOrderDto: CreateOrderDto, userId: string): Promise<{
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
    update(id: string, updateOrderDto: UpdateOrderDto, userId: any): Promise<string>;
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
    accept(id: string, repairmanId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    start(id: string, repairmanId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    decline(id: string, repairmanId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    finish(id: string, repairmanId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        addressId: string;
        repairmanId: string | null;
        paymentType: import(".prisma/client").$Enums.PaymentType;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    cancel(id: string, userId: string): Promise<{
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
