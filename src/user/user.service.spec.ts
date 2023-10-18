import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(['user1', 'user2']),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn().mockReturnValue({}), // Add this line
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(['user1', 'user2']);
    });
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const mockUser = {
        username: 'username',
        email: 'email@test.com',
        password: 'password',
      };

      const mockSavedUser = {
        ...mockUser,
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.save.mockResolvedValue(mockSavedUser);

      const result = await service.create(mockUser);

      expect(bcrypt.compare(mockUser.password, result.password)).toBeTruthy();
      expect(result).toEqual(mockSavedUser);
    });

    it('should throw ConflictException when username or email already exists', async () => {
      const mockUser = {
        username: 'existingUsername',
        email: 'existingEmail@test.com',
        password: 'password',
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.create(mockUser)).rejects.toThrow();
    });
  });

  // Add more test cases as needed
});
