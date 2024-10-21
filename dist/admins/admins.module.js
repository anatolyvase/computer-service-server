"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const admins_service_1 = require("./admins.service");
const admins_controller_1 = require("./admins.controller");
let AdminsModule = class AdminsModule {
};
exports.AdminsModule = AdminsModule;
exports.AdminsModule = AdminsModule = __decorate([
    (0, common_1.Module)({
        controllers: [admins_controller_1.AdminsController],
        providers: [admins_service_1.AdminsService],
        imports: [database_module_1.DatabaseModule],
        exports: [admins_service_1.AdminsService],
    })
], AdminsModule);
//# sourceMappingURL=admins.module.js.map