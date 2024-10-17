import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly db: DatabaseService) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.db.service.create({
      data: { ...createServiceDto, imageUrl: '' },
    });
  }

  async findAll() {
    return this.db.service.findMany();
  }

  async findOne(id: string) {
    const service = await this.db.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async findMany(ids: string[]) {
    ids.forEach((val) => this.findOne(val));

    return this.db.service.findMany({
      where: { id: { in: ids } },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id);
    return this.db.service.update({ where: { id }, data: updateServiceDto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.service.delete({ where: { id } });
  }
}
