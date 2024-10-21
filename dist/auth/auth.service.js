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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admins_service_1 = require("../admins/admins.service");
const database_service_1 = require("../database/database.service");
const repairman_service_1 = require("../repairman/repairman.service");
const users_service_1 = require("../users/users.service");
const roles_decorator_1 = require("./decorators/roles.decorator");
let AuthService = class AuthService {
    constructor(db, usersService, jwtService, adminsService, repairmanService) {
        this.db = db;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.adminsService = adminsService;
        this.repairmanService = repairmanService;
        this.ACCESS_TOKEN_EXPIRATION = '30m';
        this.REFRESH_TOKEN_EXPIRATION = '30d';
    }
    async validateUser(hashedPassword, password) {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            throw new common_1.UnauthorizedException();
        }
    }
    async userSignIn(signInDto) {
        const { email, password } = signInDto;
        const { id, password: hashedPass } = await this.usersService.findOneByEmail(email);
        await this.validateUser(hashedPass, password);
        return this.signTokens({ id, role: roles_decorator_1.Role.USER });
    }
    async userSignUp(createUserDto) {
        const { id } = await this.usersService.create(createUserDto);
        return this.signTokens({ id, role: roles_decorator_1.Role.USER });
    }
    async adminSignIn(signInDto) {
        const { email, password } = signInDto;
        const { id, password: hashedPass } = await this.adminsService.findOneByEmail(email);
        await this.validateUser(hashedPass, password);
        return this.signTokens({ id, role: roles_decorator_1.Role.ADMIN });
    }
    async repairmanSignIn(signInDto) {
        const { email, password } = signInDto;
        const { id, password: hashedPass } = await this.repairmanService.findOneByEmail(email);
        await this.validateUser(hashedPass, password);
        return this.signTokens({ id, role: roles_decorator_1.Role.REPAIRMAN });
    }
    signTokens(payload) {
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: this.ACCESS_TOKEN_EXPIRATION,
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: this.REFRESH_TOKEN_EXPIRATION,
            }),
        };
    }
    async refresh(refresh_token) {
        try {
            const payload = this.jwtService.verify(refresh_token, {
                secret: process.env.JWT_SECRET,
            });
            return this.signTokens({ id: payload.id, role: payload.role });
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        admins_service_1.AdminsService,
        repairman_service_1.RepairmanService])
], AuthService);
//# sourceMappingURL=auth.service.js.map