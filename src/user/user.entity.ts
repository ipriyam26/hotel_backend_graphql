import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', unique: true })
  username: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  // Note: You might want to hide this from GraphQL schema
  @Column({ type: 'varchar' })
  password: string;

  // Note: You might want to hide this from GraphQL schema
  @Column({ type: 'varchar', nullable: true })
  salt: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
