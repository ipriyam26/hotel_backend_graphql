import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { CreateHotelInput } from './dtos/create-hotel.dto';
import { UpdateHotelInput } from './dtos/update-hotel.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Mutation(() => Hotel)
  async createHotel(
    @Args('createHotelInput') createHotelInput: CreateHotelInput,
  ): Promise<Hotel> {
    return await this.hotelService.create(createHotelInput);
  }

  @Query(() => [Hotel], { name: 'getAllHotels' })
  async findAll(): Promise<Hotel[]> {
    return await this.hotelService.findAll();
  }

  @Query(() => Hotel, { name: 'getHotelById' })
  async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Hotel> {
    return await this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('updateHotelInput') updateHotelInput: UpdateHotelInput,
  ): Promise<Hotel> {
    return await this.hotelService.update(updateHotelInput);
  }

  @Mutation(() => Hotel)
  async removeHotel(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Hotel> {
    return await this.hotelService.remove(id);
  }
}
