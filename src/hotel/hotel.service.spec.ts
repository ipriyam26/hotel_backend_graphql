import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { CreateHotelInput } from './dtos/create-hotel.dto';
import { UpdateHotelInput } from './dtos/update-hotel.dto';

describe('HotelService', () => {
  let service: HotelService;
  let mockRepository;
  const hotel1: Hotel = {
    id: 1,
    name: 'hotel1',
    description: 'description',
    address: 'address',
    rating: 5,
    city: 'city',
    state: 'state',
    image_url: 'image_url',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };
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

  describe('create', () => {
    it('should create a hotel', async () => {
      const createHotelInput: CreateHotelInput = {
        name: 'hotel1',
        description: 'description',
        address: 'address',
        rating: 5,
        pincode: 123456,
        city: 'city',
        state: 'state',
        image_url: 'image_url',
      };
      const result: Hotel = {
        id: 1,
        ...createHotelInput,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockRepository.save.mockResolvedValue(result);

      expect(await service.create(createHotelInput)).toEqual(result);
      expect(mockRepository.create).toHaveBeenCalledWith(createHotelInput);
      expect(mockRepository.save).toHaveBeenCalledWith(createHotelInput);
    });
  });

  describe('find', () => {
    describe('findOne', () => {
      it('should return a hotel', async () => {
        mockRepository.findOne.mockResolvedValue(hotel1);

        expect(await service.findOne(1)).toEqual(hotel1);
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: [{ id: 1 }],
        });
      });
    });

    describe('findAll', () => {
      it('should return an array of hotels', async () => {
        const result: Hotel[] = [
          {
            id: 1,
            name: 'hotel1',
            description: 'description',
            address: 'address',
            rating: 5,
            city: 'city',
            state: 'state',
            image_url: 'image_url',
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            id: 2,
            name: 'hotel2',
            description: 'description',
            address: 'address',
            rating: 5,
            city: 'city',
            state: 'state',
            image_url: 'image_url',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ];

        mockRepository.find.mockResolvedValue(result);

        expect(await service.findAll()).toEqual(result);
        expect(mockRepository.find).toHaveBeenCalledWith();
      });
    });
  });
  describe('update', () => {
    it('should update a hotel', async () => {
      const updateHotelInput: UpdateHotelInput = {
        id: 1,
        name: 'hotel1',
        description: 'description',
        address: 'addressNew',
      };

      const result: Hotel = {
        id: 1,
        name: 'hotel1',
        description: 'description',
        address: 'addressNew',
        ...hotel1,
      };

      mockRepository.save.mockResolvedValue(result);
      mockRepository.findOne.mockResolvedValue(result);

      expect(await service.update(updateHotelInput)).toEqual(result);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: [{ id: 1 }],
      });
      expect(mockRepository.save).toHaveBeenCalledWith(updateHotelInput);
    });
  });
});
