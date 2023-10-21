import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateUserInput } from './dtos/create-user.dto';
import { GetUserArgs } from './dtos/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs) {
    const { username, email } = getUserArgs;
    if (!username && !email) {
      throw new BadRequestException(
        'You must provide either username or email.',
      );
    }
    return await this.userService.findOne(username, email);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return await this.userService.create(createUserData);
  }
}
