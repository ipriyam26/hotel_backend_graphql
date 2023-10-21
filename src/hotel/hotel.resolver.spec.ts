import { Test, TestingModule } from '@nestjs/testing';
import { HotelResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';
import { CreateHotelInput } from './dtos/create-hotel.dto';
import { UpdateHotelInput } from './dtos/update-hotel.dto';

describe('HotelResolver', () => {
  let resolver: HotelResolver;
  const mockHotelService = {
    create: jest
      .fn()
      .mockImplementation((hotelData: CreateHotelInput) => hotelData),
    findAll: jest.fn().mockResolvedValue(['hotel1', 'hotel2']),
    findOne: jest.fn().mockImplementation((id: number) => {
      return { id, name: 'hotel1' };
    }),
    update: jest
      .fn()
      .mockImplementation((updateHotelInput: UpdateHotelInput) => {
        return { id: updateHotelInput.id, ...updateHotelInput };
      }),
    remove: jest.fn().mockImplementation((hotelId: number) => {
      return { id: hotelId };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelResolver,
        {
          provide: HotelService,
          useValue: mockHotelService,
        },
      ],
    }).compile();

    resolver = module.get<HotelResolver>(HotelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a hotel', async () => {
    const hotelData: CreateHotelInput = {
      name: 'hotel1',
      description: 'description',
      address: 'address',
      rating: 5,
      pincode: 123456,
      city: 'city',
      state: 'state',
      image_url: 'image_url',
    };
    expect(await resolver.createHotel(hotelData)).toEqual(hotelData);
  });

  it('should return an array of hotels', async () => {
    expect(await resolver.findAll()).toEqual(['hotel1', 'hotel2']);
  });
  it('should return a hotel', async () => {
    expect(await resolver.findOne(1)).toEqual({
      id: 1,
      name: 'hotel1',
    });
  });

  it('should update a hotel', async () => {
    const updateHotelInput: UpdateHotelInput = {
      id: 1,
      name: 'hotel1',
      description: 'description',
      address: 'address',
      rating: 5,
      pincode: 123456,
      city: 'city',
      state: 'state',
      image_url: 'image_url',
    };
    expect(await resolver.updateHotel(updateHotelInput)).toEqual(
      updateHotelInput,
    );
  });

  it('should remove a hotel', async () => {
    expect(await resolver.removeHotel(1)).toEqual({ id: 1 });
  });
});
