import { Test, TestingModule } from '@nestjs/testing';
import { HotelResolver } from './hotel.resolver';
import { HotelService } from './hotel.service';

describe('HotelResolver', () => {
  let resolver: HotelResolver;
  const mockHotelService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
});
