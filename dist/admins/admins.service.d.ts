import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createAdminDto: CreateAdminDto): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<{
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
        password: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
