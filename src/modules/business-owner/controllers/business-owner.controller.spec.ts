import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { BusinessOwnerController } from './business-owner.controller';
import { BusinessOwnerService } from '../services/business-owner.service';
import { BusinessOwnerGetResponse } from '../models/business-owner-get-response.interface';
import { payload } from '../../../../mocks/payload.mock';
import { businessOwnerGetResponseForGuest } from '../../../../mocks/business-owner-get-response-guest.mock';
import { BusinessOwnerGetDetailedResponse } from '../models/business-owner-get-detailed-response.interface';
import { businessOwnerGetDetailedResponse } from '../../../../mocks/business-owner-get-detailed-response-guest.mock';

const mockBusinessOwnerService = {
  getBusinessOwners: jest.fn(() => of({})),
  getBusinessOwnerByBusinessOwnerIdForInvestor: jest.fn(() => ({})),
};

describe('BusinessOwnerController', () => {
  let controller: BusinessOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessOwnerController],
      providers: [
        {
          provide: BusinessOwnerService,
          useValue: mockBusinessOwnerService,
        },
      ],
    }).compile();

    controller = module.get<BusinessOwnerController>(BusinessOwnerController);
  });

  describe('getBusinessOwners', () => {
    it('should return an array of business owners', async () => {
      const companyName = 'Test Company';

      jest
        .spyOn(mockBusinessOwnerService, 'getBusinessOwners')
        .mockReturnValueOnce(of(businessOwnerGetResponseForGuest));

      const businessOwners: BusinessOwnerGetResponse[] = await firstValueFrom(
        controller.getBusinessOwners(payload, companyName),
      );

      expect(businessOwners).toEqual(businessOwnerGetResponseForGuest);
      expect(mockBusinessOwnerService.getBusinessOwners).toHaveBeenCalledWith(
        payload,
        companyName,
      );
    });
  });

  describe('getBusinessOwnerByIdForInvestor', () => {
    it('should return a detailed business owner for an investor', async () => {
      const businessOwnerId = 1;

      jest
        .spyOn(
          mockBusinessOwnerService,
          'getBusinessOwnerByBusinessOwnerIdForInvestor',
        )
        .mockReturnValueOnce(of(businessOwnerGetDetailedResponse));

      const detailedBusinessOwner: BusinessOwnerGetDetailedResponse =
        await firstValueFrom(
          controller.getBusinessOwnerByIdForInvestor(businessOwnerId),
        );

      expect(detailedBusinessOwner).toEqual(businessOwnerGetDetailedResponse);
      expect(
        mockBusinessOwnerService.getBusinessOwnerByBusinessOwnerIdForInvestor,
      ).toHaveBeenCalledWith(businessOwnerId);
    });
  });
});
