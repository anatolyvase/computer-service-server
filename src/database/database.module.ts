import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Module({
  exports: [DatabaseService],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
