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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairmanController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const create_repairman_dto_1 = require("./dto/create-repairman.dto");
const update_repairman_dto_1 = require("./dto/update-repairman.dto");
const repairman_service_1 = require("./repairman.service");
let RepairmanController = class RepairmanController {
    constructor(repairmanService) {
        this.repairmanService = repairmanService;
    }
    create(createRepairmanDto) {
        return this.repairmanService.create(createRepairmanDto);
    }
    findAll() {
        return this.repairmanService.findAll();
    }
    findOne(id) {
        return this.repairmanService.findOne(id);
    }
    update(id, updateRepairmanDto) {
        return this.repairmanService.update(id, updateRepairmanDto);
    }
    remove(id) {
        return this.repairmanService.remove(id);
    }
};
exports.RepairmanController = RepairmanController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_repairman_dto_1.CreateRepairmanDto]),
    __metadata("design:returntype", void 0)
], RepairmanController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RepairmanController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepairmanController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_repairman_dto_1.UpdateRepairmanDto]),
    __metadata("design:returntype", void 0)
], RepairmanController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepairmanController.prototype, "remove", null);
exports.RepairmanController = RepairmanController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('repairman'),
    __metadata("design:paramtypes", [repairman_service_1.RepairmanService])
], RepairmanController);
//# sourceMappingURL=repairman.controller.js.map