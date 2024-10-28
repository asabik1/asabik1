import { Test, TestingModule } from '@nestjs/testing';
import { Observable, firstValueFrom, of } from 'rxjs';
import { GetGlobalSettingsResponse } from '../models/global-settings-response.interface';
import { UserIdentity } from '../../plaid/models/user-identy.interface';
import { RangesResponse } from '../models/ranges-response.interface';
import { GlobalSettingsController } from './global-settings.controller';
import { GlobalSettingsService } from '../services/global-settings.service';
import { RatingSettingsService } from '../services/rating-settings.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Rating } from '../../investment-request/enum/rating.enum';
import { payload } from '../../../../mocks/payload.mock';
import { UpdateGlobalSettingsDto } from '../dto/global-settings-update.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';

const mockGlobalSettingsService = {
  getGlobalSettings: jest.fn(() => of({})),
  getAdminPaymentData: jest.fn(() => of({})),
  updateGlobalSettings: jest.fn(() => of()),
};

const mockRatingSettingsService = {
  getRatings: jest.fn(() => of({} as RangesResponse)),
  updateRanges: jest.fn(() => of()),
};

describe('GlobalSettingsController', () => {
  let controller: GlobalSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalSettingsController],
      providers: [
        {
          provide: GlobalSettingsService,
          useValue: mockGlobalSettingsService,
        },
        {
          provide: RatingSettingsService,
          useValue: mockRatingSettingsService,
        },
      ],
    })
      .overrideGuard(AuthGuard(['jwt']))
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<GlobalSettingsController>(GlobalSettingsController);
  });

  describe('getGlobalSettings', () => {
    it('should return global settings', async () => {
      const result: GetGlobalSettingsResponse = {
        maxReturnTermWOManualProcessing: 3,
        r: 0.05,
        m: 0.1,
        a: 0.02,
        raisingTimeLimit: 7,
        applicationFee: 500,
        minLoan: 2_000,
        maxLoan: 50_000,
        invalidTransactionPenalty: 100,
        plaidTokenPenalty: 50,
      };

      jest
        .spyOn(mockGlobalSettingsService, 'getGlobalSettings')
        .mockReturnValueOnce(of(result));

      const globalSettings: GetGlobalSettingsResponse = await firstValueFrom(
        controller.getGlobalSettings(),
      );

      expect(globalSettings).toEqual(result);
      expect(mockGlobalSettingsService.getGlobalSettings).toHaveBeenCalled();
    });
  });

  describe('getRatings', () => {
    it('should return ratings', async () => {
      const result: RangesResponse = {
        yearOne: [
          {
            rating: Rating.Aaa,
            low: 0,
            high: 0.000003,
          },
          {
            rating: Rating.Aa1,
            low: 0.000003,
            high: 0.000018,
          },
        ],
        yearTwo: [],
        yearThree: [],
        yearFour: [],
        yearFive: [],
      };

      jest
        .spyOn(mockRatingSettingsService, 'getRatings')
        .mockReturnValueOnce(of(result));

      const ratings: RangesResponse = await firstValueFrom(
        controller.getRatings(),
      );

      expect(ratings).toEqual(result);
      expect(mockRatingSettingsService.getRatings).toHaveBeenCalled();
    });
  });

  describe('getAdminPaymentData', () => {
    it('should return admin payment data', async () => {
      const result: UserIdentity = {
        name: 'John Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        phone: '555-555-5555',
        email: 'john.doe@example.com',
      };

      jest
        .spyOn(mockGlobalSettingsService, 'getAdminPaymentData')
        .mockReturnValueOnce(of(result));

      const adminPaymentData: UserIdentity = await firstValueFrom(
        controller.getAdminPaymentData(payload),
      );

      expect(adminPaymentData).toEqual(result);
      expect(
        mockGlobalSettingsService.getAdminPaymentData,
      ).toHaveBeenCalledWith(payload.userId);
    });
  });

  describe('updateGlobalSettings', () => {
    it('should update global settings', async () => {
      const updateDto: UpdateGlobalSettingsDto = {
        maxReturnTermWOManualProcessing: 2,
        r: 0.5,
        m: 0.1,
        a: 2,
        raisingTimeLimit: 14,
        applicationFee: 1_000,
        minLoan: 5_000,
        maxLoan: 50_000,
        invalidTransactionPenalty: 100,
        plaidTokenPenalty: 50,
      };

      const result: Observable<void> = await controller.updateGlobalSettings(
        updateDto,
      );

      expect(result).toBeDefined();
      expect(
        mockGlobalSettingsService.updateGlobalSettings,
      ).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('updateRanges', () => {
    it('should update ranges', async () => {
      const updateDto: UpdateRatingDto = {
        year: 1,
        rangesRowUpdate: [
          {
            rating: Rating.Aa1,
            low: 0.0002,
            high: 0.0003,
          },
        ],
      };

      const result: Observable<void> = await controller.updateRanges(updateDto);

      expect(result).toBeDefined();
      expect(mockRatingSettingsService.updateRanges).toHaveBeenCalledWith(
        updateDto,
      );
    });
  });
});
