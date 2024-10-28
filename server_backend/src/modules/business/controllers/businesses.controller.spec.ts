import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { BusinessesController } from './businesses.controller';
import { BusinessService } from '../services/business.service';
import { BusinessSectorService } from '../services/business-sector.service';
import { BusinessSubsectorService } from '../services/business-subsector.service';
import { BusinessGetResponse } from '../models/business-get-response.interface';
import { BusinessSectorGetResponse } from '../models/business-sector-get-response.interface';
import { BusinessSubsectorGetResponse } from '../models/business-subsector-get-response.interface';

const mockBusinessService = {
  getBusinesses: jest.fn(() => of([])),
};

const mockBusinessSectorService = {
  getBusinessSectors: jest.fn(() => of([])),
};

const mockBusinessSubSectorService = {
  getBusinessSubsectors: jest.fn(() => of([])),
};

describe('BusinessesController', () => {
  let controller: BusinessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessesController],
      providers: [
        {
          provide: BusinessService,
          useValue: mockBusinessService,
        },
        {
          provide: BusinessSectorService,
          useValue: mockBusinessSectorService,
        },
        {
          provide: BusinessSubsectorService,
          useValue: mockBusinessSubSectorService,
        },
      ],
    }).compile();

    controller = module.get<BusinessesController>(BusinessesController);
  });

  describe('getBusinesses', () => {
    it('should return an array of businesses', async () => {
      const result: BusinessGetResponse[] = [
        { id: 11, name: 'Agriculture, Forestry, Fishing and Hunting' },
        { id: 21, name: 'Mining, Quarrying, and Oil and Gas Extraction' },
      ];

      jest
        .spyOn(mockBusinessService, 'getBusinesses')
        .mockReturnValueOnce(of(result));

      const businesses: BusinessGetResponse[] = await firstValueFrom(
        controller.getBusinesses(),
      );

      expect(businesses).toEqual(result);
      expect(mockBusinessService.getBusinesses).toHaveBeenCalled();
    });
  });

  describe('getBusinessSectors', () => {
    it('should return an array of business sectors', async () => {
      const businessId = 11;
      const result: BusinessSectorGetResponse[] = [
        { id: 111, name: 'Crop Production' },
        { id: 1111, name: 'Oilseed and Grain Farming' },
        { id: 1112, name: 'Vegetable and Melon Farming' },
      ];

      jest
        .spyOn(mockBusinessSectorService, 'getBusinessSectors')
        .mockReturnValueOnce(of(result));

      const businessSectors: BusinessSectorGetResponse[] = await firstValueFrom(
        controller.getBusinessSectors(businessId),
      );

      expect(businessSectors).toEqual(result);
      expect(mockBusinessSectorService.getBusinessSectors).toHaveBeenCalledWith(
        businessId,
      );
    });
  });

  describe('getBusinessSubsectors', () => {
    it('should return an array of business subsectors', async () => {
      const businessId = 11;
      const sectorId = 1111;
      const result: BusinessSubsectorGetResponse[] = [
        { id: 11111, name: 'Soybean Farming' },
        { id: 11112, name: 'Oilseed (except Soybean) Farmin' },
        { id: 11113, name: 'Dry Pea and Bean Farming' },
      ];

      jest
        .spyOn(mockBusinessSubSectorService, 'getBusinessSubsectors')
        .mockReturnValueOnce(of(result));

      const businessSubsectors: BusinessSubsectorGetResponse[] =
        await firstValueFrom(
          controller.getBusinessSubsectors(businessId, sectorId),
        );

      expect(businessSubsectors).toEqual(result);
      expect(
        mockBusinessSubSectorService.getBusinessSubsectors,
      ).toHaveBeenCalledWith(businessId, sectorId);
    });
  });
});
