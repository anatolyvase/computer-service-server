import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { DatabaseService } from 'src/database/database.service';
import { RepairmanService } from 'src/repairman/repairman.service';
import { ServicesService } from 'src/services/services.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Prisma, Service, OrderStatus } from '@prisma/client';

type Include = Prisma.OrderInclude;

@Injectable()
export class OrdersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
    private readonly basketService: BasketService,
    private readonly repairmanService: RepairmanService,
    private readonly servicesService: ServicesService,
  ) {}

  private readonly include: Include = {
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

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const address = await this.db.address.findUnique({
      where: { id: createOrderDto.addressId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    const services = await this.basketService.getBasketByUserId(userId);

    if (services.items.length !== createOrderDto.services.length) {
      throw new NotFoundException('Service not found');
    }

    if (services.items.some((service) => !service.isAvailable)) {
      throw new ConflictException('Service is not available');
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
        status: OrderStatus.PENDING,
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

  async findOne(id: string) {
    const order = await this.db.order.findUnique({
      where: {
        id,
      },
      include: this.include,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId) {
    await this.findOne(id);
    let services: Service[] | undefined = undefined;
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

  async remove(id: string) {
    await this.findOne(id);
    return this.db.order.delete({ where: { id } });
  }

  async accept(id: string, repairmanId: string) {
    const order = await this.findOne(id);

    if (order.repairmanId) {
      throw new ConflictException('Order already accepted');
    }

    return this.db.order.update({
      where: { id },
      data: { status: OrderStatus.ACCEPTED, repairmanId },
    });
  }

  async start(id: string, repairmanId: string) {
    const order = await this.findOne(id);

    if (order.repairmanId) {
      throw new ConflictException('Order already started');
    }

    if (order.repairmanId !== repairmanId) {
      throw new ForbiddenException('You are not allowed to start this order');
    }

    return this.db.order.update({
      where: { id },
      data: { status: OrderStatus.IN_PROGRESS },
    });
  }

  async decline(id: string, repairmanId: string) {
    const order = await this.findOne(id);

    if (order.repairmanId !== repairmanId) {
      throw new ForbiddenException('You are not allowed to decline this order');
    }

    return this.db.order.update({
      where: { id },
      data: { status: OrderStatus.DECLINED },
    });
  }

  async finish(id: string, repairmanId: string) {
    const order = await this.findOne(id);

    if (order.repairmanId !== repairmanId) {
      throw new ForbiddenException('You are not allowed to finish this order');
    }

    return this.db.order.update({
      where: { id },
      data: { status: OrderStatus.FINISHED },
    });
  }

  async cancel(id: string, userId: string) {
    const order = await this.findOne(id);

    if (order.userId !== userId) {
      throw new ForbiddenException('You are not allowed to cancel this order');
    }

    return this.db.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELED },
    });
  }
}
