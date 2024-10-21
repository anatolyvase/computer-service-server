"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const database_service_1 = require("../database/database.service");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
        this.include = {
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    avatarUrl: true,
                },
            },
        };
    }
    async create(createUserDto) {
        const { email, password, ...profile } = createUserDto;
        const isEmailExist = await this.db.user.findUnique({
            where: {
                email,
            },
        });
        if (isEmailExist) {
            throw new common_1.ConflictException('Email already exists');
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
    async findOne(id) {
        const user = await this.db.user.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findOneByEmail(email) {
        const user = await this.db.user.findUnique({
            where: {
                email,
            },
            include: this.include,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async changePassword(updateUserDto, senderId) {
        const user = await this.findOne(senderId);
        const isMatch = await bcrypt.compare(updateUserDto.password, user.password);
        if (!isMatch) {
            throw new common_1.ConflictException('Invalid password');
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
    async getAddressesByUserId(senderId) {
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
    async addAddress(createAddressDto, senderId) {
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
    async removeAddress(addressId, senderId) {
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
            throw new common_1.NotFoundException('Address not found');
        }
        return this.db.address.delete({
            where: {
                id: addressId,
            },
        });
    }
    async updateProfile(updateUserProfileDto, senderId) {
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
    async remove(id, senderId) {
        await this.findOne(id);
        if (id !== senderId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this user');
        }
        return this.db.user.delete({
            where: {
                id,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map