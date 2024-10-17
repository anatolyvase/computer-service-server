import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { RepairmanModule } from './repairman/repairman.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, AdminsModule, RepairmanModule, ServicesModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
