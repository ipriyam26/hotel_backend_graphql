import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  Max,
  Min,
  MaxLength,
  IsString,
  IsInt,
  IsNumber,
  IsUrl,
} from 'class-validator';

@InputType()
export class CreateHotelInput {
  @Field()
  @IsString()
  @MaxLength(60)
  name: string;

  @Field()
  @IsString()
  @MaxLength(60)
  address: string;

  @Field(() => Int)
  @IsInt()
  pincode: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field()
  @IsString()
  @MaxLength(40)
  city: string;

  @Field()
  @IsString()
  @MaxLength(40)
  state: string;

  @Field()
  @IsString()
  @MaxLength(200)
  description: string;

  @Field()
  @IsString()
  @IsUrl()
  @MaxLength(200)
  image_url: string;
}
