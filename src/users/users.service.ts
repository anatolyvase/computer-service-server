import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

type Include = Prisma.UserInclude;

@Injectable()
export class UsersService {
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

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...profile } = createUserDto;

    const isEmailExist = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.db.user.create({
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
    return this.db.user.findMany({
      include: this.include,
    });
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
      include: this.include,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
      include: this.include,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      include: this.include,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
