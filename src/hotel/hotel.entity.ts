import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType() // GraphQL Object Type
@Entity() // TypeORM Entity
export class Hotel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  address: string;

  @Field()
  @Column({ type: 'varchar', length: 40 })
  city: string;

  @Field()
  @Column({ type: 'varchar', length: 40 })
  state: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0, precision: 1, scale: 1 })
  rating: number;

  @Field()
  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Field()
  @IsUrl()
  @Column({ type: 'varchar', length: 200 })
  image_url: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
