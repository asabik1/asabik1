import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { EmailDto } from '../dto/email.dto';
import { EmailConfirmationTokenDto } from '../dto/email-confirmation-token.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Role } from '../../auth/enums/role.enum';
import { GetUsersInfo } from '../models/get-users-info-interface';
import { User } from '../entities/users.entity';
import { CreateAppleUserDto } from '../dto/create-apple-user';
import { ConfirmEmailResponse } from '../dto/confirm-email-response.dto';
import { AdminCharts } from '../../business-owner/models/admin-charts.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { mockUser } from '../../../../mocks/user.mock';
import { payload } from '../../../../mocks/payload.mock';

const mockUsersService = {
  getInfoAboutUsers: jest.fn(() => of({} as GetUsersInfo)),
  getAdminCharts: jest.fn(() => of({} as AdminCharts)),
  createUser: jest.fn(() => of({} as User)),
  createAppleUser: jest.fn(() => of({} as User)),
  sendConfirmationEmail: jest.fn(() => of()),
  confirmEmail: jest.fn(() => of({} as ConfirmEmailResponse)),
  sendResetPasswordEmail: jest.fn(() => of()),
  changePassword: jest.fn(() => of()),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard(['jwt', 'anonymous']))
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('getInfoAboutUsers', () => {
    it('should return information about users', async () => {
      const info: GetUsersInfo = {
        numberOfUsers: 50,
        numberOfBusinessOwners: 20,
        numberOfInvestors: 30,
      };

      jest
        .spyOn(mockUsersService, 'getInfoAboutUsers')
        .mockReturnValueOnce(of(info));

      const result: GetUsersInfo = await firstValueFrom(
        controller.getInfoAboutUsers(),
      );

      expect(result).toEqual(info);
      expect(mockUsersService.getInfoAboutUsers).toHaveBeenCalled();
    });
  });

  describe('getMonthlyReportChartData', () => {
    it('should return monthly report chart data', async () => {
      const points: AdminCharts = {
        businessOwnersMonthlyReports: [],
        requestsByPurpose: [],
      };

      jest
        .spyOn(mockUsersService, 'getAdminCharts')
        .mockReturnValueOnce(of(points));

      const result: AdminCharts = await firstValueFrom(
        controller.getMonthlyReportChartData(),
      );

      expect(result).toEqual(points);
      expect(mockUsersService.getAdminCharts).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: mockUser.email,
        password: 'Password1@',
        role: mockUser.role,
      };

      jest
        .spyOn(mockUsersService, 'createUser')
        .mockReturnValueOnce(of(mockUser));

      const result: User = await firstValueFrom(
        controller.createUser(createUserDto, payload),
      );

      expect(result).toEqual(mockUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(
        payload,
        createUserDto,
      );
    });
  });

  describe('createAppleUser', () => {
    it('should create an Apple user', async () => {
      const createAppleUserDto: CreateAppleUserDto = {
        appleId: 'sample-id',
        email: mockUser.email,
        name: 'Test Name',
        role: mockUser.role,
      };

      jest
        .spyOn(mockUsersService, 'createAppleUser')
        .mockReturnValueOnce(of(mockUser));

      const result: User = await firstValueFrom(
        controller.createAppleUser(createAppleUserDto, payload),
      );

      expect(result).toEqual(mockUser);
      expect(mockUsersService.createAppleUser).toHaveBeenCalledWith(
        payload,
        createAppleUserDto,
      );
    });
  });

  describe('sendConfirmationEmail', () => {
    it('should send a confirmation email', async () => {
      const emailDto: EmailDto = {
        email: mockUser.email,
      };

      jest
        .spyOn(mockUsersService, 'sendConfirmationEmail')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.sendConfirmationEmail(
        emailDto,
      );

      expect(result).toBeDefined();
      expect(mockUsersService.sendConfirmationEmail).toHaveBeenCalledWith(
        emailDto,
      );
    });
  });

  describe('confirmEmail', () => {
    it('should confirm email', async () => {
      const confirmEmail: ConfirmEmailResponse = {
        role: Role.Investor,
      };
      const tokenDto: EmailConfirmationTokenDto = {
        token: 'sample-token',
      };
      const userId = 1;

      jest
        .spyOn(mockUsersService, 'confirmEmail')
        .mockReturnValueOnce(of(confirmEmail));

      const result: ConfirmEmailResponse = await firstValueFrom(
        controller.confirmEmail(tokenDto, userId),
      );

      expect(result).toEqual(confirmEmail);
      expect(mockUsersService.confirmEmail).toHaveBeenCalledWith(
        tokenDto,
        userId,
      );
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should send a reset password email', async () => {
      const emailDto: EmailDto = {
        email: mockUser.email,
      };

      jest
        .spyOn(mockUsersService, 'sendResetPasswordEmail')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.sendResetPasswordEmail(
        emailDto,
      );

      expect(result).toBeDefined();
      expect(mockUsersService.sendResetPasswordEmail).toHaveBeenCalledWith(
        emailDto,
      );
    });
  });

  describe('changePassword', () => {
    it('should change password', async () => {
      const passwordDto: UpdatePasswordDto = {
        password: 'Password2#',
        token: 'sample-pass-token',
      };
      const userId = 1;

      jest.spyOn(mockUsersService, 'changePassword').mockReturnValueOnce(of());

      const result: Observable<void> = await controller.changePassword(
        passwordDto,
        userId,
      );

      expect(result).toBeDefined();
      expect(mockUsersService.changePassword).toHaveBeenCalledWith(
        passwordDto,
        userId,
      );
    });
  });
});
