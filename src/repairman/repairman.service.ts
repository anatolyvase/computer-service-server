import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateRepairmanDto } from './dto/create-repairman.dto';
import { UpdateRepairmanDto } from './dto/update-repairman.dto';
import { Prisma } from '@prisma/client';

type Include = Prisma.RepairmanInclude;

@Injectable()
export class RepairmanService {
  constructor(private readonly db: DatabaseService) {}

  public readonly include: Include = {
    profile: {
      select: {
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },
    },
  };

  async create(createRepairmanDto: CreateRepairmanDto) {
    const { email, password, ...profile } = createRepairmanDto;

    const isEmailExist = await this.db.repairman.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.db.repairman.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            ...profile,
            avatarUrl: '',
          },
        },
      },
    });
  }

  async findAll() {
    return this.db.repairman.findMany({
      include: this.include,
    });
  }

  async findOne(id: string) {
    const repairman = await this.db.repairman.findUnique({
      where: {
        id,
      },
      include: this.include,
    });

    if (!repairman) {
      throw new NotFoundException('Repairman not found');
    }

    return repairman;
  }

  async update(id: string, updateRepairmanDto: UpdateRepairmanDto) {
    await this.findOne(id);

    return this.db.repairman.update({
      where: {
        id,
      },
      data: {
        ...updateRepairmanDto,
      },
      include: this.include,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.repairman.delete({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    const repairman = await this.db.repairman.findUnique({
      where: {
        email,
      },
      include: this.include,
    });

    if (!repairman) {
      throw new NotFoundException('Repairman not found');
    }

    return repairman;
  }
}
