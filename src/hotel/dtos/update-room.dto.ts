import { Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateRoomInput {
  id: number;
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  hotel_id?: number;
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  type?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  availability?: boolean;
}
