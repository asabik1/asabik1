import { Test, TestingModule } from '@nestjs/testing';
import { BusinessOwneProfileController } from './business-owner-profile.controller';
import { BusinessOwnerService } from '../services/business-owner.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { BusinessOwnerProfilePatchDto } from '../dto/business-owner-profile-update.dto';
import { BusinessOwnerProfileGetResponse } from '../models/business-owner-profile-get-response.interface';
import { BusinessOwnerProfilePreviewGetResponse } from '../models/business-owner-profile-preview-get-response.interface';
import { MonthlyReportRatingResponse } from '../models/monthly-report-rating-response.interface';
import { UpdateMonthlyReportDto } from '../dto/update-monthly-report.dto';
import { ConfirmMonthlyReportDto } from '../dto/confirm-monthly-report.dto';
import { BusinessOwnerAlertsResponse } from '../models/get-business-owner-alerts.interface';
import { ChartPoint } from '../models/chart-point.interface';
import { payload } from '../../../../mocks/payload.mock';
import { mockBusinessOwnerProfileGetResponse } from '../../../../mocks/business-owner-profile-get-response.mock';
import { mockBusinessOwnerProfilePreviewGetResponse } from '../../../../mocks/business-owner-profile-preview-get-response.mock';
import { mockMonthlyReportRatingResponse } from '../../../../mocks/monthly-report-rating-response.mock';

const mockBusinessOwnerService = {
  uploadProfileImage: jest.fn(() => of()),
  patchProfile: jest.fn(() => of()),
  deleteProfileImage: jest.fn(() => of()),
  getBusinessOwnersProfile: jest.fn(() =>
    of({} as BusinessOwnerProfileGetResponse),
  ),
  getBusinessOwnersProfilePreview: jest.fn(() =>
    of({} as BusinessOwnerProfilePreviewGetResponse),
  ),
  getBusinessOwnersMonthlyReport: jest.fn(() =>
    of({} as MonthlyReportRatingResponse),
  ),
  getBusinessOwnerAlerts: jest.fn(() => of({} as BusinessOwnerAlertsResponse)),
  getMonthlyReportChartData: jest.fn(() => of([] as ChartPoint[])),
  updateBusinessOwnersMonthlyReport: jest.fn(() => of()),
  confirmMonthlyReportByBusinessOwner: jest.fn(() => of()),
  deleteBusinessOwner: jest.fn(() => of()),
};

describe('BusinessOwneProfileController', () => {
  let controller: BusinessOwneProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessOwneProfileController],
      providers: [
        {
          provide: BusinessOwnerService,
          useValue: mockBusinessOwnerService,
        },
      ],
    }).compile();

    controller = module.get<BusinessOwneProfileController>(
      BusinessOwneProfileController,
    );
  });

  describe('uploadProfileImage', () => {
    it('should upload a profile image', async () => {
      const file: Express.Multer.File = {} as any;

      jest
        .spyOn(mockBusinessOwnerService, 'uploadProfileImage')
        .mockReturnValue(of());

      const result: Observable<void> = await controller.uploadProfileImage(
        file,
        payload,
      );

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.uploadProfileImage).toHaveBeenCalledWith(
        payload.userId,
        file,
      );
    });
  });

  describe('patchProfile', () => {
    it('should patch the business owner profile', async () => {
      const businessOwnerPatchDto: BusinessOwnerProfilePatchDto = {
        companyName: 'Company',
        ownerName: 'John Doe',
        street: 'Test Street',
        city: 'Medium City',
        zipCode: '01234',
        phone: '5551234567',
        website: 'company@web.com',
        description: 'Sample description',
      };

      jest
        .spyOn(mockBusinessOwnerService, 'patchProfile')
        .mockReturnValue(of());

      const result: Observable<void> = await controller.patchProfile(
        businessOwnerPatchDto,
        payload,
      );

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.patchProfile).toHaveBeenCalledWith(
        payload.businessOwnerId,
        businessOwnerPatchDto,
      );
    });
  });

  describe('deleteFileById', () => {
    it('should delete the business owner profile image', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'deleteProfileImage')
        .mockReturnValue(of());

      const result: Observable<void> = await controller.deleteFileById(payload);

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.deleteProfileImage).toHaveBeenCalledWith(
        payload.userId,
        payload.businessOwnerId,
      );
    });
  });

  describe('getBusinessOwnersProfile', () => {
    it('should get the business owner profile', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersProfile')
        .mockReturnValue(of(mockBusinessOwnerProfileGetResponse));

      const result: BusinessOwnerProfileGetResponse = await firstValueFrom(
        controller.getBusinessOwnersProfile(payload),
      );

      expect(result).toEqual(mockBusinessOwnerProfileGetResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnersProfile,
      ).toHaveBeenCalledWith(payload.businessOwnerId);
    });
  });

  describe('getBusinessOwnerProfilePreview', () => {
    it('should get the business owner profile preview', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersProfilePreview')
        .mockReturnValue(of(mockBusinessOwnerProfilePreviewGetResponse));

      const result: BusinessOwnerProfilePreviewGetResponse =
        await firstValueFrom(
          controller.getBusinessOwnerProfilePreview(payload),
        );

      expect(result).toEqual(mockBusinessOwnerProfilePreviewGetResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnersProfilePreview,
      ).toHaveBeenCalledWith(payload.businessOwnerId);
    });
  });

  describe('getBusinessOwnersMonthlyReport', () => {
    it('should get the business owner monthly report', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnersMonthlyReport')
        .mockReturnValue(of(mockMonthlyReportRatingResponse));

      const result: MonthlyReportRatingResponse = await firstValueFrom(
        controller.getBusinessOwnersMonthlyReport(payload),
      );

      expect(result).toEqual(mockMonthlyReportRatingResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnersMonthlyReport,
      ).toHaveBeenCalledWith(payload.businessOwnerId);
    });
  });

  describe('getBusinessOwnerAlerts', () => {
    it('should get business owner alerts', async () => {
      const alerts: BusinessOwnerAlertsResponse = {
        isReportPending: false,
        isProfileIncomplete: false,
        isInvestmentRequestExpired: true,
        isVerified: true,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwnerAlerts')
        .mockReturnValue(of(alerts));

      const result: BusinessOwnerAlertsResponse = await firstValueFrom(
        controller.getBusinessOwnerAlerts(payload),
      );

      expect(result).toEqual(alerts);
      expect(
        mockBusinessOwnerService.getBusinessOwnerAlerts,
      ).toHaveBeenCalledWith(payload.businessOwnerId);
    });
  });

  describe('getMonthlyReportChartData', () => {
    it('should get monthly report chart data', async () => {
      const points: ChartPoint[] = [
        {
          reportDateAsX: '10-2023',
          inflowAsY: 1_250,
          outflowAsY: 210,
        },
        {
          reportDateAsX: '11-2023',
          inflowAsY: 2_050,
          outflowAsY: 150,
        },
      ];

      jest
        .spyOn(mockBusinessOwnerService, 'getMonthlyReportChartData')
        .mockReturnValue(of(points));

      const result: ChartPoint[] = await firstValueFrom(
        controller.getMonthlyReportChartData(payload),
      );

      expect(result).toEqual(points);
      expect(
        mockBusinessOwnerService.getMonthlyReportChartData,
      ).toHaveBeenCalledWith(payload.businessOwnerId);
    });
  });

  describe('updateBusinessOwnersMonthlyReport', () => {
    it('should update business owner monthly report', async () => {
      const updateMonthlyReportDto: UpdateMonthlyReportDto = {
        monthlyReportId: 10,
        inflow: 1_000,
        inflowDescription: 'Inflow descr',
        outflow: 1_250,
        outflowDescription: 'Outflow descr',
      };

      jest
        .spyOn(mockBusinessOwnerService, 'updateBusinessOwnersMonthlyReport')
        .mockReturnValueOnce(of());

      const result: Observable<void> =
        await controller.updateBusinessOwnersMonthlyReport(
          updateMonthlyReportDto,
          payload,
        );

      expect(result).toBeDefined();
      expect(
        mockBusinessOwnerService.updateBusinessOwnersMonthlyReport,
      ).toHaveBeenCalledWith(updateMonthlyReportDto, payload.businessOwnerId);
    });
  });

  describe('confirmMonthlyReport', () => {
    it('should confirm business owner monthly report', async () => {
      const confirmMonthlyReportDto: ConfirmMonthlyReportDto = {
        monthlyReportId: 12,
      };

      jest
        .spyOn(mockBusinessOwnerService, 'confirmMonthlyReportByBusinessOwner')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.confirmMonthlyReport(
        confirmMonthlyReportDto,
      );

      expect(result).toBeDefined();
      expect(
        mockBusinessOwnerService.confirmMonthlyReportByBusinessOwner,
      ).toHaveBeenCalledWith(confirmMonthlyReportDto);
    });
  });

  describe('deleteBusinessOwner', () => {
    it('should delete business owner', async () => {
      jest
        .spyOn(mockBusinessOwnerService, 'deleteBusinessOwner')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.deleteBusinessOwner(
        payload,
      );

      expect(result).toBeDefined();
      expect(mockBusinessOwnerService.deleteBusinessOwner).toHaveBeenCalledWith(
        payload,
      );
    });
  });
});
