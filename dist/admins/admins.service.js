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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const database_service_1 = require("../database/database.service");
let AdminsService = class AdminsService {
    constructor(db) {
        this.db = db;
    }
    async create(createAdminDto) {
        const { email, password } = createAdminDto;
        const isEmailExist = await this.db.admin.findUnique({
            where: {
                email,
            },
        });
        if (isEmailExist) {
            throw new common_1.ConflictException('Email already exists');
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
    async findOne(id) {
        const admin = await this.db.admin.findUnique({
            where: {
                id,
            },
        });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        return admin;
    }
    async update(id, updateAdminDto) {
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
    async remove(id) {
        await this.findOne(id);
        return this.db.admin.delete({
            where: {
                id,
            },
        });
    }
    async findOneByEmail(email) {
        const admin = await this.db.admin.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        return admin;
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AdminsService);
//# sourceMappingURL=admins.service.js.map