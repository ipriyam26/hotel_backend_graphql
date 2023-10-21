import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';

describe('HotelService', () => {
  let service: HotelService;
  const mockRepository = {
    find: jest.fn().mockResolvedValue(['hotel1', 'hotel2']),
    findOne: jest.fn(),
    create: jest.fn().mockReturnValue({}),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,

        {
          provide: getRepositoryToken(Hotel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
