import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { HotelModule } from './hotel.module';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { HotelService } from './hotel.service';

describe('User GraphQL (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HotelModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Hotel, Room],
          synchronize: true,
        }),
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const hotelService = moduleFixture.get<HotelService>(HotelService);
    await hotelService.create({
      name: 'hotel1',
      description: 'description',
      address: 'address',
      rating: 5,
      pincode: 123456,
      city: 'city',
      state: 'state',
      image_url: 'image_url',
    });
    await hotelService.create({
      name: 'hotel2',
      description: 'description',
      address: 'address',
      rating: 5,
      pincode: 123456,
      city: 'city',
      state: 'state',
      image_url: 'image_url',
    });
    await app.init();
  });

  it('should get all users', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ getUsers { username, email } }',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.getUsers).toBeDefined();
        expect(body.data.getUsers.length).toBe(2);
        expect(body.data.getUsers[0].username).toBe('user1');
        expect(body.data.getUsers[1].username).toBe('user2');
      });
  });

  it('should get a single user by username', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          '{ getUser(username: "user1") { username, email, created_at,id } }',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.getUser).toBeDefined();
        expect(body.data.getUser.username).toBe('user1');
      });
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation { createUser(createUserData: { username: "user3", email: "dummy@gmail.com", password: "password3" }) { username, email, created_at,id } }',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createUser).toBeDefined();
        expect(body.data.createUser.username).toBe('user3');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
