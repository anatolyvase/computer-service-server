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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ServicesService = class ServicesService {
    constructor(db) {
        this.db = db;
    }
    async create(createServiceDto) {
        return this.db.service.create({
            data: { ...createServiceDto, imageUrl: '' },
        });
    }
    async findAll() {
        return this.db.service.findMany();
    }
    async findOne(id) {
        const service = await this.db.service.findUnique({ where: { id } });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async findMany(ids) {
        ids.forEach((val) => this.findOne(val));
        if (ids.length === 0) {
            return [];
        }
        return this.db.service.findMany({
            where: { id: { in: ids } },
        });
    }
    async update(id, updateServiceDto) {
        await this.findOne(id);
        return this.db.service.update({ where: { id }, data: updateServiceDto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.db.service.delete({ where: { id } });
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ServicesService);
//# sourceMappingURL=services.service.js.map