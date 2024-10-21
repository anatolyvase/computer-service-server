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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const basket_service_1 = require("../basket/basket.service");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_user_profile_dto_1 = require("./dto/update-user-profile.dto");
const users_service_1 = require("./users.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let UsersController = class UsersController {
    constructor(usersService, basketService) {
        this.usersService = usersService;
        this.basketService = basketService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findMe(user) {
        console.log(user);
        return this.usersService.findOne(user.id);
    }
    getAddresses(user) {
        return this.usersService.getAddressesByUserId(user.id);
    }
    addAddress(createAddressDto, user) {
        return this.usersService.addAddress(createAddressDto, user.id);
    }
    removeAddress(addressId, user) {
        return this.usersService.removeAddress(addressId, user.id);
    }
    updateProfile(updateUserDto, user) {
        return this.usersService.updateProfile(updateUserDto, user.id);
    }
    getBasketItems(user) {
        return this.basketService.getBasketByUserId(user.id);
    }
    addServiceToBasket(user, serviceId) {
        return this.basketService.addServiceInUserBasket(user.id, serviceId);
    }
    removeServiceFromBasket(user, serviceId) {
        return this.basketService.removeServiceFromBasket(user.id, serviceId);
    }
    clearBasket(user) {
        return this.basketService.clearBasket(user.id);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    remove(id, user) {
        return this.usersService.remove(id, user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)('me/addresses'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAddresses", null);
__decorate([
    (0, common_1.Post)('me/addresses'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Delete)('me/addresses/:addressId'),
    __param(0, (0, common_1.Param)('addressId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeAddress", null);
__decorate([
    (0, common_1.Patch)('me/profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_profile_dto_1.UpdateUserProfileDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('me/basket'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getBasketItems", null);
__decorate([
    (0, common_1.Patch)('me/basket/add/:serviceId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addServiceToBasket", null);
__decorate([
    (0, common_1.Patch)('me/basket/remove/:serviceId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeServiceFromBasket", null);
__decorate([
    (0, common_1.Patch)('me/basket/clear'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "clearBasket", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        basket_service_1.BasketService])
], UsersController);
//# sourceMappingURL=users.controller.js.map