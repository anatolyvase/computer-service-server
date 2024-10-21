import { DatabaseService } from 'src/database/database.service';
import { CreateRepairmanDto } from './dto/create-repairman.dto';
import { UpdateRepairmanDto } from './dto/update-repairman.dto';
import { Prisma } from '@prisma/client';
type Include = Prisma.RepairmanInclude;
export declare class RepairmanService {
    private readonly db;
    constructor(db: DatabaseService);
    readonly include: Include;
    create(createRepairmanDto: CreateRepairmanDto): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            repairmanId: string;
        };
        orders: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            addressId: string;
            repairmanId: string | null;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        refreshSessions: {
            id: string;
            createdAt: Date;
            repairmanId: string;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            orders: number;
            refreshSessions: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            repairmanId: string;
        };
        orders: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            addressId: string;
            repairmanId: string | null;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        refreshSessions: {
            id: string;
            createdAt: Date;
            repairmanId: string;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            orders: number;
            refreshSessions: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateRepairmanDto: UpdateRepairmanDto): Promise<{
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            repairmanId: string;
        };
        orders: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            addressId: string;
            repairmanId: string | null;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        refreshSessions: {
            id: string;
            createdAt: Date;
            repairmanId: string;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            orders: number;
            refreshSessions: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByEmail(email: string): Promise<{
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            repairmanId: string;
        };
        orders: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            addressId: string;
            repairmanId: string | null;
            paymentType: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        refreshSessions: {
            id: string;
            createdAt: Date;
            repairmanId: string;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            orders: number;
            refreshSessions: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
