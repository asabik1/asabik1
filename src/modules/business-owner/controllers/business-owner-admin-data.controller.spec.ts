import { Test, TestingModule } from '@nestjs/testing';
import { BusinessOwnerAdminDataController } from './business-owner-admin-data.controller';
import { BusinessOwnerService } from '../services/business-owner.service';
import { MonthlyReportService } from '../services/monthly-report.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { BlockBusinessOwnerRequest } from '../dto/block-business-owner-request.dto';
import { BusinessOwnerProfilePatchDto } from '../dto/business-owner-profile-update.dto';
import { DecideMonthlyReport } from '../dto/decide-monthly-report.dto';
import { DecideInvestmentRequest } from '../dto/decide-investment-request.dto';
import { BusinessOwnerGetAdminResponse } from '../models/business-owner-get-admin-response.interface';
import { BusinessOwnerGetDetailedAdminResponse } from '../models/business-owner-get-detailed-admin-response.interface';
import { IdentityScoreAdminResponse } from '../models/identity-score-admin-response.interface';
import { BusinessOwnerSurveyAnswers } from '../models/business-owner-survey-answers.interface';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { MonthlyReportAdminResponse } from '../models/monthly-report-admin-response.interface';
import { NewestMonthlyReportAdminResponse } from '../models/newest-monthly-report-admin-response.interface';
import { HttpStatus } from '@nestjs/common';
import { mockBusinessOwnerGetAdminResponse } from '../../../../mocks/business-owner-get-admin-response.mock';
import { mockBusinessOwnerGetDetailedAdminResponse } from '../../../../mocks/business-owner-get-detailed-admin-response.mock';
import { mockBusinessOwnerSurveyAnswers } from '../../../../mocks/business-owner-survey-answers.mock';
import { mockMonthlyReport } from '../../../../mocks/monthly-report.mock';
import { mockMonthlyReportAdminResponse } from '../../../../mocks/monthly-report-admin-response.mock';

const mockBusinessOwnerService = {
  getBusinessOwnersForAdmin: jest.fn(() =>
    of([] as BusinessOwnerGetAdminResponse[]),
  ),
  getBusinessOwnerForAdminById: jest.fn(() =>
    of({} as BusinessOwnerGetDetailedAdminResponse),
  ),
  getBusinessOwnersIdentityScore: jest.fn(() =>
    of({} as IdentityScoreAdminResponse),
  ),
  getSurveyAnswers: jest.fn(() => of({} as BusinessOwnerSurveyAnswers)),
  getMonthlyReportsForAdmin: jest.fn(() => of([] as MonthlyReport[])),
  getBusinessOwnersNewestMonthlyReport: jest.fn(() =>
    of({} as NewestMonthlyReportAdminResponse),
  ),
  getBusinessOwnersMonthlyReportForAdmin: jest.fn(() =>
    of({} as MonthlyReportAdminResponse),
  ),
  blockOrUnblockBusinessOwner: jest.fn(() => of()),
  decideMonthlyReport: jest.fn(() => of()),
  decideInvestmentRequestForManualProcessing: jest.fn(() => of()),
  updateBusinessOwner: jest.fn(() => of()),
  uploadReports: jest.fn(() => of()),
};

const mockMonthlyReportService = {
  getMonthlyReportsForAdmin: jest.fn(() => of([] as MonthlyReport[])),
};

describe('BusinessOwnerAdminDataController', () => {
  let controller: BusinessOwnerAdminDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessOwnerAdminDataController],
      providers: [
        {
          provide: BusinessOwnerService,
          useValue: mockBusinessOwnerService,
        },
        {
          provide: MonthlyReportService,
          useValue: mockMonthlyReportService,
        },
      ],
    }).compile();

    controller = module.get<BusinessOwnerAdminDataController>(
      BusinessOwnerAdminDataController,
    );
  });

  describe('getBusinessOwnersForAdmin', () => {
    it('should get business owners for admin', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersForAdmin')
        .mockReturnValue(of([mockBusinessOwnerGetAdminResponse]));

      const result: BusinessOwnerGetAdminResponse[] = await firstValueFrom(
        controller.getBusinessOwnersForAdmin(),
      );

      expect(result).toEqual([mockBusinessOwnerGetAdminResponse]);
      expect(
        mockBusinessOwnerService.getBusinessOwnersForAdmin,
      ).toHaveBeenCalledWith(undefined);
    });
  });

  describe('getBusinessOwnerByIdForAdmin', () => {
    it('should get business owner by ID for admin', async () => {
      const businessOwnerId = 1;

      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnerForAdminById')
        .mockReturnValue(of(mockBusinessOwnerGetDetailedAdminResponse));

      const result: BusinessOwnerGetDetailedAdminResponse =
        await firstValueFrom(
          controller.getBusinessOwnerByIdForAdmin(businessOwnerId),
        );

      expect(result).toEqual(mockBusinessOwnerGetDetailedAdminResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnerForAdminById,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });

  describe('getBusinessOwnersIdentityScore', () => {
    it('should get business owner identity score', async () => {
      const businessOwnerId = 1;
      const score: IdentityScoreAdminResponse = {
        extractedName: 'John Doe',
        ownerNameScore: 85,
        extractedPhone: '+1 (555) 987-6543',
        phoneScore: 92,
        extractedEmail: 'john.doe@example.com',
        emailScore: 88,
        extractedAddress: {
          street: '123 Main Street',
          city: 'Cityville',
          zipCode: '54321',
        },
        addressScore: 78,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersIdentityScore')
        .mockReturnValue(of(score));

      const result: IdentityScoreAdminResponse = await firstValueFrom(
        controller.getBusinessOwnersIdentityScore(businessOwnerId),
      );

      expect(result).toEqual(score);
      expect(
        mockBusinessOwnerService.getBusinessOwnersIdentityScore,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });

  describe('getSurveyAnswersPdf', () => {
    it('should get business owner survey answers', async () => {
      const businessOwnerId = 1;

      jest
        .spyOn(mockBusinessOwnerService, 'getSurveyAnswers')
        .mockReturnValue(of(mockBusinessOwnerSurveyAnswers));

      const result: BusinessOwnerSurveyAnswers = await firstValueFrom(
        controller.getSurveyAnswersPdf(businessOwnerId),
      );

      expect(result).toEqual(mockBusinessOwnerSurveyAnswers);
      expect(mockBusinessOwnerService.getSurveyAnswers).toHaveBeenCalledWith(
        businessOwnerId,
      );
    });
  });

  describe('getMonthlyReportsForAdmin', () => {
    it('should get monthly reports for admin', async () => {
      const businessOwnerId = 1;

      jest
        .spyOn(mockMonthlyReportService, 'getMonthlyReportsForAdmin')
        .mockReturnValue(of([mockMonthlyReport]));

      const result: MonthlyReport[] = await firstValueFrom(
        controller.getMonthlyReportsForAdmin(businessOwnerId),
      );

      expect(result).toEqual([mockMonthlyReport]);
      expect(
        mockMonthlyReportService.getMonthlyReportsForAdmin,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });

  describe('getBusinessOwnersNewestMonthlyReport', () => {
    it('should get business owner newest monthly report for admin', async () => {
      const businessOwnerId = 1;
      const newestReport = {
        actionRequired: true,
        reportDate: '2023-01-31',
        isConfirmed: true,
        isOriginal: true,
        inflow: 1500,
        inflowDescription: 'Sample inflow description',
        outflow: 1200,
        outflowDescription: 'Sample outflow description',
        vInflow: 1600,
        vTotal: 1300,
        outflowExceed: false,
        isNegativeBalance: false,
        noEarning: false,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersNewestMonthlyReport')
        .mockReturnValue(of(newestReport));

      const result: NewestMonthlyReportAdminResponse = await firstValueFrom(
        controller.getBusinessOwnersNewestMonthlyReport(businessOwnerId),
      );

      expect(result).toEqual(newestReport);
      expect(
        mockBusinessOwnerService.getBusinessOwnersNewestMonthlyReport,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });

  describe('getBusinessOwnersMonthlyReport', () => {
    it('should get business owner monthly report for admin', async () => {
      const businessOwnerId = 1;
      jest
        .spyOn(
          mockBusinessOwnerService,
          'getBusinessOwnersMonthlyReportForAdmin',
        )
        .mockReturnValue(of(mockMonthlyReportAdminResponse));

      const result: MonthlyReportAdminResponse = await firstValueFrom(
        controller.getBusinessOwnersMonthlyReport(businessOwnerId),
      );

      expect(result).toEqual(mockMonthlyReportAdminResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnersMonthlyReportForAdmin,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });

  describe('blockOrUnblockBusinessOwner', () => {
    it('should block or unblock business owner', async () => {
      const businessOwnerId = 1;
      const blockBusinessOwnerRequest: BlockBusinessOwnerRequest = {
        isBlocked: true,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'blockOrUnblockBusinessOwner')
        .mockReturnValue(of());

      const result: Observable<void> =
        await controller.blockOrUnblockBusinessOwner(
          businessOwnerId,
          blockBusinessOwnerRequest,
        );

      expect(result).toBeDefined();
      expect(
        mockBusinessOwnerService.blockOrUnblockBusinessOwner,
      ).toHaveBeenCalledWith(businessOwnerId, blockBusinessOwnerRequest);
    });
  });

  describe('decideMonthlyReportUpdate', () => {
    it('should decide monthly report update', async () => {
      const decideMonthlyReport: DecideMonthlyReport = {
        monthlyReportId: 1,
        isApproved: true,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'decideMonthlyReport')
        .mockReturnValue(of());

      const result: Observable<void> =
        await controller.decideMonthlyReportUpdate(decideMonthlyReport);

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.decideMonthlyReport).toHaveBeenCalledWith(
        decideMonthlyReport,
      );
    });
  });

  describe('decideInvestmentRequestForManualProcessing', () => {
    it('should decide investment request for manual processing', async () => {
      const decideInvestmentRequest: DecideInvestmentRequest = {
        investmentRequestId: 1,
        isApproved: true,
      };

      jest
        .spyOn(
          mockBusinessOwnerService,
          'decideInvestmentRequestForManualProcessing',
        )
        .mockReturnValue(of());

      const result: Observable<void> =
        await controller.decideInvestmentRequestForManualProcessing(
          decideInvestmentRequest,
        );

      expect(result).toBeDefined();
      expect(
        mockBusinessOwnerService.decideInvestmentRequestForManualProcessing,
      ).toHaveBeenCalledWith(decideInvestmentRequest);
    });
  });

  describe('patchProfile', () => {
    it('should update business owner profile', async () => {
      const businessOwnerId = 1;
      const businessOwnerProfilePatchDto: BusinessOwnerProfilePatchDto = {
        companyName: 'New Company Name',
        ownerName: 'John Doe',
        street: '123 Main Street',
        city: 'Cityville',
        zipCode: '54321',
        phone: '+1 (555) 987-6543',
        website: 'newcompany.com',
        description: 'Updated business owner description.',
      };

      jest
        .spyOn(mockBusinessOwnerService, 'updateBusinessOwner')
        .mockReturnValue(of());

      const result: Observable<void> = await controller.patchProfile(
        businessOwnerProfilePatchDto,
        businessOwnerId,
      );

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.updateBusinessOwner).toHaveBeenCalledWith(
        businessOwnerId,
        businessOwnerProfilePatchDto,
      );
    });
  });

  describe('uploadReports', () => {
    it('should upload CSV reports', async () => {
      const file: Express.Multer.File = {} as any;
      const businessOwnerId = 1;

      jest
        .spyOn(mockBusinessOwnerService, 'uploadReports')
        .mockReturnValue(of());

      const result: Observable<void> = await controller.uploadReports(
        file,
        businessOwnerId,
      );

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.uploadReports).toHaveBeenCalledWith(
        businessOwnerId,
        file,
      );
    });
  });
});
