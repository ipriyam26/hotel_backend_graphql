import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';

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
    @Args('id', { type: () => String }) id: string,
  ): Promise<Hotel> {
    return await this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  async updateHotel(
    @Args('updateHotelInput') updateHotelInput: UpdateHotelInput,
  ): Promise<Hotel> {
    return await this.hotelService.update(
      updateHotelInput.id,
      updateHotelInput,
    );
  }

  @Mutation(() => Hotel)
  async removeHotel(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Hotel> {
    return await this.hotelService.remove(id);
  }
}
