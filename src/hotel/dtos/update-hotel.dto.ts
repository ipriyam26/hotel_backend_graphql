import {
  IsOptional,
  IsString,
  IsInt,
  Max,
  Min,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHotelInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  address?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  pincode?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  state?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(200)
  image_url?: string;
}
