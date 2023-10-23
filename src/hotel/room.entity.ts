import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';

@ObjectType()
@Entity('rooms')
export class Room {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int) // Import Int from '@nestjs/graphql'
  @Column({ type: 'int' })
  hotel_id: number;

  @Field(() => Hotel)
  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column({ type: 'boolean' })
  availability: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
