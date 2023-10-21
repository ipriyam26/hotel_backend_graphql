import { Injectable, NotFoundException } from '@nestjs/common';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateHotelInput } from './dtos/create-hotel.dto';
import { UpdateHotelInput } from './dtos/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotleRepository: Repository<Hotel>,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    this.hotleRepository.create(createHotelInput);
    return await this.hotleRepository.save(createHotelInput);
  }
  async findOne(id: number): Promise<Hotel> {
    return await this.hotleRepository.findOne({
      where: [{ id }],
    });
  }
  async findAll(): Promise<Hotel[]> {
    return await this.hotleRepository.find();
  }
  async update(updateHotelInput: UpdateHotelInput): Promise<Hotel> | undefined {
    const hotel = await this.findOne(updateHotelInput.id);
    if (!hotel) {
      throw new NotFoundException(`Hotel #${updateHotelInput.id} not found`);
    }
    return await this.hotleRepository.save(updateHotelInput);
  }
  async remove(id: number): Promise<Hotel> {
    const hotel = await this.findOne(id);
    if (!hotel) {
      throw new NotFoundException(`Hotel #${id} not found`);
    }
    return await this.hotleRepository.remove(hotel);
  }
}
