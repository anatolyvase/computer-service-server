import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.USER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Roles(Role.REPAIRMAN, Role.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(Role.REPAIRMAN, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }

  @Roles(Role.REPAIRMAN)
  accept(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() repairman: any,
  ) {
    return this.ordersService.accept(id, repairman.id);
  }

  @Roles(Role.REPAIRMAN)
  decline(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() repairman: any,
  ) {
    return this.ordersService.decline(id, repairman.id);
  }

  @Roles(Role.REPAIRMAN)
  finish(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() repairman: any,
  ) {
    return this.ordersService.finish(id, repairman.id);
  }

  @Roles(Role.REPAIRMAN)
  start(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() repairman: any) {
    return this.ordersService.start(id, repairman.id);
  }

  @Roles(Role.USER)
  cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    return this.ordersService.cancel(id, user.id);
  }
}
