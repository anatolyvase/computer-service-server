import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateAddressDto } from 'src/users/dto/create-address.dto';
import { UpdateAccountPasswordDto } from 'src/users/dto/update-user-account.dto';
import { UpdateUserProfileDto } from 'src/users/dto/update-user-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
type Include = Prisma.UserInclude;
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    readonly include: Include;
    create(createUserDto: CreateUserDto): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
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
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
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
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByEmail(email: string): Promise<{
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
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
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(updateUserDto: UpdateAccountPasswordDto, senderId: string): Promise<{
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
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
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAddressesByUserId(senderId: string): Promise<{
        city: string;
        state: string;
        country: string;
        address1: string;
        address2: string;
        zip: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    addAddress(createAddressDto: CreateAddressDto, senderId: string): Promise<{
        userId: string;
        addressId: string;
    }>;
    removeAddress(addressId: string, senderId: string): Promise<{
        city: string;
        state: string;
        country: string;
        address1: string;
        address2: string;
        zip: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(updateUserProfileDto: UpdateUserProfileDto, senderId: string): Promise<{
        basket: {
            userId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            phoneNumber: string;
            firstName: string;
            lastName: string;
            userId: string;
            avatarUrl: string;
        };
        adresses: {
            userId: string;
            addressId: string;
        }[];
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
            userId: string;
            id: string;
            createdAt: Date;
            token: string;
            expired: Date;
            fingerprint: string;
            ip: string;
        }[];
        _count: {
            profile: number;
            adresses: number;
            orders: number;
            refreshSessions: number;
            basket: number;
        };
    } & {
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, senderId: string): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
