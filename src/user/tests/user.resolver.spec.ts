import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { CreateUserInput } from '../dtos/create-user.dto';

const mockUserService = {
  findAll: jest.fn().mockResolvedValue(['list', 'of', 'users']),
  findOne: jest.fn().mockImplementation((username: string) => {
    return { username };
  }),
  create: jest.fn().mockImplementation((userData: any) => userData),
};
describe('UserResolver', () => {
  describe('Unit Tests', () => {
    let resolver: UserResolver;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserResolver,
          {
            provide: UserService,
            useValue: mockUserService,
          },
        ],
      }).compile();

      resolver = module.get<UserResolver>(UserResolver);
    });

    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('getUsers', () => {
      it('should return an array of users', async () => {
        expect(await resolver.getUsers()).toEqual(['list', 'of', 'users']);
      });
    });

    describe('getUser', () => {
      it('should return a user', async () => {
        expect(
          await resolver.getUser({ username: 'username', email: undefined }),
        ).toEqual({
          username: 'username',
        });
      });
    });

    describe('createUser', () => {
      it('should return a user', async () => {
        const userData: CreateUserInput = {
          username: 'username',
          email: 'email',
          password: 'password',
        };
        expect(await resolver.createUser(userData)).toEqual(userData);
      });
    });
  });
});
