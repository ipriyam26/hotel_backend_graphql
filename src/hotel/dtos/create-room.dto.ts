import { Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, MaxLength } from 'class-validator';

export class CreateRoomInputDto {
  @Field(() => Int)
  @IsInt()
  hotel_id: number;
  @Field()
  @MaxLength(50)
  type: string;
  @Field()
  @IsNumber()
  price: number;
  @Field()
  @IsBoolean()
  availability: boolean;
}
