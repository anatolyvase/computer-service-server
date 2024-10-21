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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const cookies_decorator_1 = require("./decorators/cookies.decorator");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const update_user_account_dto_1 = require("../users/dto/update-user-account.dto");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const public_decorator_1 = require("./decorators/public.decorator");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async userSignIn(signInDto, response) {
        const { access_token, refresh_token } = await this.authService.userSignIn(signInDto);
        await this.setRefreshTokenCookie(refresh_token, response);
        return { access_token };
    }
    async userSignUp(createUserDto, response) {
        const { access_token, refresh_token } = await this.authService.userSignUp(createUserDto);
        await this.setRefreshTokenCookie(refresh_token, response);
        return { access_token };
    }
    updatePassword(passwordDto, user) {
        return this.usersService.changePassword(passwordDto, user.id);
    }
    async adminSignIn(signInDto, response) {
        const { refresh_token, access_token } = await this.authService.adminSignIn(signInDto);
        await this.setRefreshTokenCookie(refresh_token, response);
        return { access_token };
    }
    async repairmanSignIn(signInDto, response) {
        const { refresh_token, access_token } = await this.authService.repairmanSignIn(signInDto);
        await this.setRefreshTokenCookie(refresh_token, response);
        return { access_token };
    }
    async refresh(refreshToken, response) {
        const { refresh_token, access_token } = await this.authService.refresh(refreshToken);
        await this.setRefreshTokenCookie(refresh_token, response);
        return { access_token };
    }
    async logout(response) {
        response.clearCookie('refresh_token');
        return 'Successfully logged out.';
    }
    async setRefreshTokenCookie(refreshToken, response) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + parseInt(this.authService.REFRESH_TOKEN_EXPIRATION));
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('users/sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userSignIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/users/sign-up'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userSignUp", null);
__decorate([
    (0, common_1.Patch)('/users/change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_account_dto_1.UpdateAccountPasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/admins/sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/repairman/sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "repairmanSignIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('refresh'),
    __param(0, (0, cookies_decorator_1.Cookies)('refresh_token')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map