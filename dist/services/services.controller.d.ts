import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
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
