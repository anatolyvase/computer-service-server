import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class BasketService {
  constructor(
    private readonly db: DatabaseService,
    private readonly servicesService: ServicesService,
  ) {}
  async create(userId: string) {
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

  async findOneByUserId(userId: string) {
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

  async getBasketByUserId(userId: string) {
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

  async addServiceInUserBasket(userId: string, serviceId: string) {
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

  async removeServiceFromBasket(userId: string, serviceId: string) {
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
      throw new NotFoundException('Service not included in this basket');
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

  async clearBasket(userId: string) {
    const basket = await this.findOneByUserId(userId);
    await this.db.basketService.deleteMany({
      where: {
        basketId: basket.id,
      },
    });
    return this.getBasketByUserId(userId);
  }
}
