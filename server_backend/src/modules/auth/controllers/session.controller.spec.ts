import { Test, TestingModule } from '@nestjs/testing';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionService } from '../services/session.service';
import { SessionController } from './session.controller';
import { mockUser } from '../../../../mocks/user.mock';
import { firstValueFrom, of } from 'rxjs';
import { CreateUserSessionResponse } from '../models/create-session-respons.interface';
import { CreateAppleSessionDto } from '../dto/create-apple-session.dto';

const mockSessionService = {
  createSession: jest.fn(() => of({})),
  createAppleSession: jest.fn(() => of({})),
};

describe('SessionController', () => {
  let controller: SessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
      ],
    }).compile();

    controller = module.get<SessionController>(SessionController);
  });

  describe('createSession', () => {
    it('should create a session', async () => {
      const createSessionDto: CreateSessionDto = {
        email: mockUser.email,
        password: 'Password1@',
      };

      const result: CreateUserSessionResponse = {
        isAppleUser: false,
        tokens: {
          expiresIn: 10800,
          accessToken: 'token-test',
        },
        name: 'Jon Doe',
        email: mockUser.email,
        role: mockUser.role,
        emailConfirmed: true,
        surveyStatus: null,
      };

      jest
        .spyOn(mockSessionService, 'createSession')
        .mockReturnValueOnce(of(result));

      const createSession: CreateUserSessionResponse = await firstValueFrom(
        controller.createSession(createSessionDto),
      );

      expect(createSession).toEqual(result);
      expect(mockSessionService.createSession).toHaveBeenCalledWith(
        createSessionDto,
      );
    });
  });

  describe('createAppleSession', () => {
    it('should create an Apple session', async () => {
      const createAppleSessionDto: CreateAppleSessionDto = {
        appleId: 'apple-id-test',
      };

      const result: CreateUserSessionResponse = {
        isAppleUser: true,
        tokens: {
          expiresIn: 10800,
          accessToken: 'token-test',
        },
        name: 'Jon Doe',
        email: mockUser.email,
        role: mockUser.role,
        emailConfirmed: true,
        surveyStatus: null,
      };

      jest
        .spyOn(mockSessionService, 'createAppleSession')
        .mockReturnValueOnce(of(result));

      const createAppleSession = await firstValueFrom(
        controller.createAppleSession(createAppleSessionDto),
      );

      expect(createAppleSession).toEqual(result);
      expect(mockSessionService.createAppleSession).toHaveBeenCalledWith(
        createAppleSessionDto,
      );
    });
  });
});
