import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateUserInput } from './dtos/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Args('username', { nullable: true }) username: string,
    @Args('email', { nullable: true }) email: string,
  ) {
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
