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
exports.RepairmanService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const database_service_1 = require("../database/database.service");
let RepairmanService = class RepairmanService {
    constructor(db) {
        this.db = db;
        this.include = {
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                },
            },
        };
    }
    async create(createRepairmanDto) {
        const { email, password, ...profile } = createRepairmanDto;
        const isEmailExist = await this.db.repairman.findUnique({
            where: {
                email,
            },
        });
        if (isEmailExist) {
            throw new common_1.ConflictException('Email already exists');
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
    async findOne(id) {
        const repairman = await this.db.repairman.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
        if (!repairman) {
            throw new common_1.NotFoundException('Repairman not found');
        }
        return repairman;
    }
    async update(id, updateRepairmanDto) {
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
    async remove(id) {
        await this.findOne(id);
        return this.db.repairman.delete({
            where: {
                id,
            },
        });
    }
    async findOneByEmail(email) {
        const repairman = await this.db.repairman.findUnique({
            where: {
                email,
            },
            include: this.include,
        });
        if (!repairman) {
            throw new common_1.NotFoundException('Repairman not found');
        }
        return repairman;
    }
};
exports.RepairmanService = RepairmanService;
exports.RepairmanService = RepairmanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RepairmanService);
//# sourceMappingURL=repairman.service.js.map