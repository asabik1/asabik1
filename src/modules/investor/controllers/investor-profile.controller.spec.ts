import { Test, TestingModule } from '@nestjs/testing';
import { InvestorProfileController } from './investor-profile.controller';
import { InvestorService } from '../services/investor.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { InvestorProfilePatchDto } from '../dto/investor-profile-patch.dto';
import { Observable, firstValueFrom, of } from 'rxjs';
import { payload } from '../../../../mocks/payload.mock';
import { InvestorProfileGetResponse } from '../models/investor-profile-get-response.interface';

const mockInvestorService = {
  getInvestorProfile: jest.fn(() => of({})),
  patchInvestorProfile: jest.fn(() => of()),
  deleteInvestor: jest.fn(() => of()),
};

describe('InvestorProfileController', () => {
  let controller: InvestorProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorProfileController],
      providers: [
        {
          provide: InvestorService,
          useValue: mockInvestorService,
        },
      ],
    })
      .overrideGuard(AuthGuard(['jwt']))
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<InvestorProfileController>(
      InvestorProfileController,
    );
  });

  describe('getInvestorProfile', () => {
    it('should return investor profile', async () => {
      const investorProfile: InvestorProfileGetResponse = {
        fullName: 'John Doe',
        email: 'doe@mail.com',
        comapnyName: 'Invest Lion',
        website: 'invest.lion.com',
        isVerified: false,
      };

      jest
        .spyOn(mockInvestorService, 'getInvestorProfile')
        .mockReturnValueOnce(of(investorProfile));

      const result: InvestorProfileGetResponse = await firstValueFrom(
        controller.getInvestorProfile(payload),
      );

      expect(result).toEqual(investorProfile);
      expect(mockInvestorService.getInvestorProfile).toHaveBeenCalledWith(
        payload,
      );
    });
  });

  describe('patchInvestorProfile', () => {
    it('should update investor profile', async () => {
      const investorProfilePatchDto: InvestorProfilePatchDto = {};

      jest
        .spyOn(mockInvestorService, 'patchInvestorProfile')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.patchInvestorProfile(
        investorProfilePatchDto,
        payload,
      );

      expect(result).toBeDefined();
      expect(mockInvestorService.patchInvestorProfile).toHaveBeenCalledWith(
        investorProfilePatchDto,
        payload,
      );
    });
  });

  describe('deleteInvestor', () => {
    it('should delete investor', async () => {
      jest
        .spyOn(mockInvestorService, 'deleteInvestor')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.deleteInvestor(payload);

      expect(result).toBeDefined();
      expect(mockInvestorService.deleteInvestor).toHaveBeenCalledWith(payload);
    });
  });
});
