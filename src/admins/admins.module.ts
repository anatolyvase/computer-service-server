import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [DatabaseModule],
  exports: [AdminsService],
})
export class AdminsModule {}
