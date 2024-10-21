import { BasketService } from 'src/basket/basket.service';
import { CreateAddressDto } from 'src/users/dto/create-address.dto';
import { UpdateUserProfileDto } from 'src/users/dto/update-user-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly basketService;
    constructor(usersService: UsersService, basketService: BasketService);
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
    findMe(user: any): Promise<{
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
    getAddresses(user: any): Promise<{
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
    addAddress(createAddressDto: CreateAddressDto, user: any): Promise<{
        userId: string;
        addressId: string;
    }>;
    removeAddress(addressId: string, user: any): Promise<{
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
    updateProfile(updateUserDto: UpdateUserProfileDto, user: any): Promise<{
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
    getBasketItems(user: any): Promise<{
        count: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: number;
            isAvailable: boolean;
            description: string;
            imageUrl: string;
            count: number;
        }[];
    }>;
    addServiceToBasket(user: any, serviceId: string): Promise<{
        count: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: number;
            isAvailable: boolean;
            description: string;
            imageUrl: string;
            count: number;
        }[];
    }>;
    removeServiceFromBasket(user: any, serviceId: string): Promise<{
        count: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: number;
            isAvailable: boolean;
            description: string;
            imageUrl: string;
            count: number;
        }[];
    }>;
    clearBasket(user: any): Promise<{
        count: number;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            price: number;
            isAvailable: boolean;
            description: string;
            imageUrl: string;
            count: number;
        }[];
    }>;
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
    remove(id: string, user: any): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
