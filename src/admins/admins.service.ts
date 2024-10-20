import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, password } = createAdminDto;

    const isEmailExist = await this.db.admin.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.db.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.db.admin.findMany();
  }

  async findOne(id: string) {
    const admin = await this.db.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id);

    return this.db.admin.update({
      where: {
        id,
      },
      data: {
        ...updateAdminDto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.admin.delete({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    const admin = await this.db.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }
}
