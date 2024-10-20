import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { BasketService } from 'src/basket/basket.service';
import { UpdateUserProfileDto } from 'src/users/dto/update-user-profile.dto';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly basketService: BasketService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@CurrentUser() user: any) {
    console.log(user);
    return this.usersService.findOne(user.id);
  }

  @Patch('me/profile')
  updateProfile(
    @Body() updateUserDto: UpdateUserProfileDto,
    @CurrentUser() user: any,
  ) {
    return this.usersService.updateProfile(updateUserDto, user.id);
  }

  @Get('me/basket')
  getBasketItems(@CurrentUser() user: any) {
    return this.basketService.getBasketByUserId(user.id);
  }

  @Patch('me/basket/add/:serviceId')
  addServiceToBasket(
    @CurrentUser() user: any,
    @Param('serviceId') serviceId: string,
  ) {
    return this.basketService.addServiceInUserBasket(user.id, serviceId);
  }

  @Patch('me/basket/remove/:serviceId')
  removeServiceFromBasket(
    @CurrentUser() user: any,
    @Param('serviceId') serviceId: string,
  ) {
    return this.basketService.removeServiceFromBasket(user.id, serviceId);
  }

  @Patch('me/basket/clear')
  clearBasket(@CurrentUser() user: any) {
    return this.basketService.clearBasket(user.id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    return this.usersService.remove(id, user.id);
  }
}
