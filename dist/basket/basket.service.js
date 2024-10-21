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
exports.BasketService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const services_service_1 = require("../services/services.service");
let BasketService = class BasketService {
    constructor(db, servicesService) {
        this.db = db;
        this.servicesService = servicesService;
    }
    async create(userId) {
        return this.db.basket.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async findOneByUserId(userId) {
        const basket = await this.db.basket.findUnique({
            where: {
                userId,
            },
        });
        if (!basket) {
            return this.create(userId);
        }
        return basket;
    }
    async getBasketByUserId(userId) {
        const basket = await this.findOneByUserId(userId);
        const basketServices = await this.db.basketService.findMany({
            where: {
                basketId: basket.id,
            },
            include: {
                service: true,
            },
        });
        const items = basketServices.map((basketService) => {
            const { service } = basketService;
            return {
                count: basketService.count,
                ...service,
            };
        });
        return {
            count: basketServices
                .flatMap((val) => val.count)
                .reduce((a, b) => a + b, 0),
            items,
        };
    }
    async addServiceInUserBasket(userId, serviceId) {
        const basket = await this.findOneByUserId(userId);
        await this.servicesService.findOne(serviceId);
        const basketService = await this.db.basketService.findUnique({
            where: {
                basketId_serviceId: {
                    basketId: basket.id,
                    serviceId,
                },
            },
        });
        if (basketService) {
            await this.db.basketService.update({
                where: { basketId_serviceId: { basketId: basket.id, serviceId } },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            });
            return this.getBasketByUserId(userId);
        }
        await this.db.basketService.create({
            data: {
                basketId: basket.id,
                serviceId,
                count: 1,
            },
        });
        return this.getBasketByUserId(userId);
    }
    async removeServiceFromBasket(userId, serviceId) {
        const basket = await this.findOneByUserId(userId);
        const basketService = await this.db.basketService.findUnique({
            where: {
                basketId_serviceId: {
                    basketId: basket.id,
                    serviceId,
                },
            },
        });
        if (!basketService) {
            throw new common_1.NotFoundException('Service not included in this basket');
        }
        if (basketService.count === 1) {
            await this.db.basketService.delete({
                where: {
                    basketId_serviceId: {
                        basketId: basket.id,
                        serviceId,
                    },
                },
            });
            return this.getBasketByUserId(userId);
        }
        await this.db.basketService.update({
            where: {
                basketId_serviceId: {
                    basketId: basket.id,
                    serviceId,
                },
            },
            data: {
                count: {
                    decrement: 1,
                },
            },
        });
        return this.getBasketByUserId(userId);
    }
    async clearBasket(userId) {
        const basket = await this.findOneByUserId(userId);
        await this.db.basketService.deleteMany({
            where: {
                basketId: basket.id,
            },
        });
        return this.getBasketByUserId(userId);
    }
};
exports.BasketService = BasketService;
exports.BasketService = BasketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        services_service_1.ServicesService])
], BasketService);
//# sourceMappingURL=basket.service.js.map