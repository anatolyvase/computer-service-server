import { Module } from '@nestjs/common';
import { BasketModule } from 'src/basket/basket.module';
import { DatabaseModule } from 'src/database/database.module';
import { RepairmanModule } from 'src/repairman/repairman.module';
import { ServicesModule } from 'src/services/services.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    DatabaseModule,
    UsersModule,
    RepairmanModule,
    ServicesModule,
    BasketModule,
  ],
})
export class OrdersModule {}
