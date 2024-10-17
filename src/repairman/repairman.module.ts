import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RepairmanService } from './repairman.service';
import { RepairmanController } from './repairman.controller';

@Module({
  controllers: [RepairmanController],
  providers: [RepairmanService],
  imports: [DatabaseModule],
  exports: [RepairmanService],
})
export class RepairmanModule {}
