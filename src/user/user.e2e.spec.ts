import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserService } from './user.service';

describe('User GraphQL (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          autoSchemaFile: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const userService = moduleFixture.get<UserService>(UserService);
    await userService.create({
      username: 'user1',
      email: 'user1@email.com',
      password: 'password1',
    });
    await userService.create({
      username: 'user2',
      email: 'user2@email.com',
      password: 'password2',
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
