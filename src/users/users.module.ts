import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
