import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
