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
import { Public } from 'src/auth/decorators/public.decorator';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateRepairmanDto } from './dto/create-repairman.dto';
import { UpdateRepairmanDto } from './dto/update-repairman.dto';
import { RepairmanService } from './repairman.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('repairman')
export class RepairmanController {
  constructor(private readonly repairmanService: RepairmanService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createRepairmanDto: CreateRepairmanDto) {
    return this.repairmanService.create(createRepairmanDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.repairmanService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.repairmanService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRepairmanDto: UpdateRepairmanDto,
  ) {
    return this.repairmanService.update(id, updateRepairmanDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.repairmanService.remove(id);
  }
}
