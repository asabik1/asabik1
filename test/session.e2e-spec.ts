import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateSessionDto } from '../src/modules/auth/dto/create-session.dto';
import { mainConfig } from '../src/main.config';
import { mockUserRepository } from '../mocks/user-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { mockUser } from '../mocks/user.mock';
import { AuthHttpResponses } from '../src/modules/auth/enums/auth.enum';

describe('SessionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    mockUser.password = await bcrypt.hash('password123', 12);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    mainConfig(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/session (POST)', () => {
    it('shoud response AUTH_FAILD if password is not correct', () => {
      const createSessionDto: CreateSessionDto = {
        email: 'joe.doe@example.com',
        password: 'wrong_password',
      };
      return request(app.getHttpServer())
        .post('/session')
        .send(createSessionDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: AuthHttpResponses.AUTH_FAILED,
        });
    });

    it('should response access token if email and password are correct', () => {
      const createSessionDto: CreateSessionDto = {
        email: 'joe.doe@example.com',
        password: 'password123',
      };
      return request(app.getHttpServer())
        .post('/session')
        .send(createSessionDto)
        .expect(HttpStatus.CREATED);
    });

    it('shoud response bad request if email is invalid', () => {
      const createSessionDto: CreateSessionDto = {
        email: 'joe.doe@@example.com',
        password: 'password123',
      };
      return request(app.getHttpServer())
        .post('/session')
        .send(createSessionDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        });
    });
  });
});
