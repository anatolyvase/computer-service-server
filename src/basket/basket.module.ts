import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesModule } from 'src/services/services.module';
import { BasketService } from './basket.service';

@Module({
  providers: [BasketService],
  imports: [DatabaseModule, ServicesModule],
  exports: [BasketService],
})
export class BasketModule {}
