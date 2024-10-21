import { DatabaseService } from 'src/database/database.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createServiceDto: CreateServiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }>;
    findMany(ids: string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }[]>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        isAvailable: boolean;
        description: string;
        imageUrl: string;
    }>;
}
