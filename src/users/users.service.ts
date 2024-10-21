import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateAddressDto } from 'src/users/dto/create-address.dto';
import { UpdateAccountPasswordDto } from 'src/users/dto/update-user-account.dto';
import { UpdateUserProfileDto } from 'src/users/dto/update-user-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';

type Include = Prisma.UserInclude;

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  public readonly include: Include = {
    profile: {
      select: {
        firstName: true,
        lastName: true,
        phoneNumber: true,
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

    const user = await this.db.user.create({
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

    await this.db.basket.create({
      data: {
        userId: user.id,
      },
    });

    return user;
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

  async changePassword(
    updateUserDto: UpdateAccountPasswordDto,
    senderId: string,
  ) {
    const user = await this.findOne(senderId);

    const isMatch = await bcrypt.compare(updateUserDto.password, user.password);

    if (!isMatch) {
      throw new ConflictException('Invalid password');
    }

    const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);

    return this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
      include: this.include,
    });
  }

  async getAddressesByUserId(senderId: string) {
    const user = await this.findOne(senderId);

    const userAddresses = await this.db.userAddress.findMany({
      where: {
        userId: user.id,
      },
      include: {
        address: true,
      },
    });

    return userAddresses.map((userAddress) => userAddress.address);
  }

  async addAddress(createAddressDto: CreateAddressDto, senderId: string) {
    const user = await this.findOne(senderId);

    const address = await this.db.address.create({
      data: createAddressDto,
    });

    return this.db.userAddress.create({
      data: {
        userId: user.id,
        addressId: address.id,
      },
    });
  }

  async removeAddress(addressId: string, senderId: string) {
    const user = await this.findOne(senderId);
    const userAddress = await this.db.userAddress.findUnique({
      where: {
        userId_addressId: {
          userId: user.id,
          addressId,
        },
      },
    });

    if (!userAddress) {
      throw new NotFoundException('Address not found');
    }

    return this.db.address.delete({
      where: {
        id: addressId,
      },
    });
  }

  async updateProfile(
    updateUserProfileDto: UpdateUserProfileDto,
    senderId: string,
  ) {
    const user = await this.findOne(senderId);

    return this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile: {
          update: updateUserProfileDto,
        },
      },
      include: this.include,
    });
  }

  async remove(id: string, senderId: string) {
    await this.findOne(id);

    if (id !== senderId) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }

    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
