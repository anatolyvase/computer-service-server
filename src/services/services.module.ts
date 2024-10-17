import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [DatabaseModule],
  exports: [ServicesService],
})
export class ServicesModule {}
