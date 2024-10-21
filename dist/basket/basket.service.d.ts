import { DatabaseService } from 'src/database/database.service';
import { ServicesService } from 'src/services/services.service';
export declare class BasketService {
    private readonly db;
    private readonly servicesService;
    constructor(db: DatabaseService, servicesService: ServicesService);
    create(userId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByUserId(userId: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getBasketByUserId(userId: string): Promise<{
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
    addServiceInUserBasket(userId: string, serviceId: string): Promise<{
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
    removeServiceFromBasket(userId: string, serviceId: string): Promise<{
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
    clearBasket(userId: string): Promise<{
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
}
