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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const basket_service_1 = require("../basket/basket.service");
const database_service_1 = require("../database/database.service");
const repairman_service_1 = require("../repairman/repairman.service");
const services_service_1 = require("../services/services.service");
const users_service_1 = require("../users/users.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(db, usersService, basketService, repairmanService, servicesService) {
        this.db = db;
        this.usersService = usersService;
        this.basketService = basketService;
        this.repairmanService = repairmanService;
        this.servicesService = servicesService;
        this.include = {
            user: {
                select: {
                    profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                            phoneNumber: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
            repairman: true,
            services: true,
        };
    }
    async create(createOrderDto, userId) {
        const address = await this.db.address.findUnique({
            where: { id: createOrderDto.addressId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Address not found');
        }
        const services = await this.basketService.getBasketByUserId(userId);
        if (services.items.length !== createOrderDto.services.length) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (services.items.some((service) => !service.isAvailable)) {
            throw new common_1.ConflictException('Service is not available');
        }
        const order = await this.db.order.create({
            data: {
                address: {
                    create: {
                        ...address,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
                status: client_1.OrderStatus.PENDING,
            },
            include: this.include,
        });
        await this.db.orderService.createMany({
            data: services.items.map((service) => ({
                serviceId: service.id,
                orderId: order.id,
                count: service.count,
            })),
        });
        await this.basketService.clearBasket(userId);
        return order;
    }
    async findAll() {
        return this.db.order.findMany({
            include: this.include,
        });
    }
    async findOne(id) {
        const order = await this.db.order.findUnique({
            where: {
                id,
            },
            include: this.include,
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async update(id, updateOrderDto, userId) {
        await this.findOne(id);
        let services = undefined;
        if (updateOrderDto.repairmanId) {
            await this.repairmanService.findOne(updateOrderDto.repairmanId);
        }
        if (userId) {
            await this.usersService.findOne(userId);
        }
        if (updateOrderDto.services) {
            services = await this.servicesService.findMany(updateOrderDto.services);
        }
        if (updateOrderDto.addressId) {
            await this.db.address.findUnique({
                where: { id: updateOrderDto.addressId },
            });
        }
        const { services: servicesIds, ...order } = updateOrderDto;
        return 'progress';
    }
    async remove(id) {
        await this.findOne(id);
        return this.db.order.delete({ where: { id } });
    }
    async accept(id, repairmanId) {
        const order = await this.findOne(id);
        if (order.repairmanId) {
            throw new common_1.ConflictException('Order already accepted');
        }
        return this.db.order.update({
            where: { id },
            data: { status: client_1.OrderStatus.ACCEPTED, repairmanId },
        });
    }
    async start(id, repairmanId) {
        const order = await this.findOne(id);
        if (order.repairmanId) {
            throw new common_1.ConflictException('Order already started');
        }
        if (order.repairmanId !== repairmanId) {
            throw new common_1.ForbiddenException('You are not allowed to start this order');
        }
        return this.db.order.update({
            where: { id },
            data: { status: client_1.OrderStatus.IN_PROGRESS },
        });
    }
    async decline(id, repairmanId) {
        const order = await this.findOne(id);
        if (order.repairmanId !== repairmanId) {
            throw new common_1.ForbiddenException('You are not allowed to decline this order');
        }
        return this.db.order.update({
            where: { id },
            data: { status: client_1.OrderStatus.DECLINED },
        });
    }
    async finish(id, repairmanId) {
        const order = await this.findOne(id);
        if (order.repairmanId !== repairmanId) {
            throw new common_1.ForbiddenException('You are not allowed to finish this order');
        }
        return this.db.order.update({
            where: { id },
            data: { status: client_1.OrderStatus.FINISHED },
        });
    }
    async cancel(id, userId) {
        const order = await this.findOne(id);
        if (order.userId !== userId) {
            throw new common_1.ForbiddenException('You are not allowed to cancel this order');
        }
        return this.db.order.update({
            where: { id },
            data: { status: client_1.OrderStatus.CANCELED },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        users_service_1.UsersService,
        basket_service_1.BasketService,
        repairman_service_1.RepairmanService,
        services_service_1.ServicesService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map