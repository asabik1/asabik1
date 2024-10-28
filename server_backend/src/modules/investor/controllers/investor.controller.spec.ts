import { Test, TestingModule } from '@nestjs/testing';
import { InvestorController } from './investor.controller';
import { InvestorService } from '../services/investor.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { InvestorGetResponse } from '../models/investor-get-response.interface';
import { InvestorDetailsGetResponse } from '../models/investor-details-get-response.interface';
import { InvestorProfilePatchDto } from '../dto/investor-profile-patch.dto';
import { BlockInvestorRequest } from '../dto/block-investor-request.dto';
import { Observable, firstValueFrom, of } from 'rxjs';

const mockInvestorService = {
  getInvestors: jest.fn(),
  getInvestorDetails: jest.fn(),
  blockOrUnblockInvestor: jest.fn(),
  patchInvestorProfileByAdmin: jest.fn(),
};

describe('InvestorController', () => {
  let controller: InvestorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorController],
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

    controller = module.get<InvestorController>(InvestorController);
  });

  describe('getInvestors', () => {
    it('should return a list of investors', async () => {
      const investors: InvestorGetResponse[] = [
        {
          id: 1,
          companyName: 'Example Company',
          fullName: 'John Doe',
          joined: new Date(),
          alreadyInvested: 5_000,
          isActive: true,
          isVerified: true,
        },
      ];

      jest
        .spyOn(mockInvestorService, 'getInvestors')
        .mockReturnValueOnce(of(investors));

      const result: InvestorGetResponse[] = await firstValueFrom(
        controller.getInvestors(),
      );

      expect(result).toEqual(investors);
      expect(mockInvestorService.getInvestors).toHaveBeenCalled();
    });
  });

  describe('getInvestorDetails', () => {
    it('should return investor details', async () => {
      const investorDetails: InvestorDetailsGetResponse = {
        id: 1,
        companyName: 'Example Company',
        fullName: 'John Doe',
        registrationDate: new Date(),
        totalInvestments: 15000,
        email: 'john.doe@example.com',
        website: 'example.com',
        isActive: true,
        isBlocked: false,
        investments: [],
        isVerified: false,
      };

      jest
        .spyOn(mockInvestorService, 'getInvestorDetails')
        .mockReturnValueOnce(of(investorDetails));

      const result: InvestorDetailsGetResponse = await firstValueFrom(
        controller.getInvestorDetails(1),
      );

      expect(result).toEqual(investorDetails);
      expect(mockInvestorService.getInvestorDetails).toHaveBeenCalledWith(1);
    });
  });

  describe('blockOrUnblockInvestor', () => {
    it('should block or unblock investor', async () => {
      const blockInvestorRequest: BlockInvestorRequest = {
        isBlocked: false,
      };

      jest
        .spyOn(mockInvestorService, 'blockOrUnblockInvestor')
        .mockReturnValueOnce(of());

      const result: Observable<void> = await controller.blockOrUnblockInvestor(
        1,
        blockInvestorRequest,
      );

      expect(result).toBeDefined();
      expect(mockInvestorService.blockOrUnblockInvestor).toHaveBeenCalledWith(
        1,
        blockInvestorRequest,
      );
    });
  });

  describe('patchInvestorProfileByAdmin', () => {
    it('should update investor profile by admin', async () => {
      const investorProfilePatchDto: InvestorProfilePatchDto = {};

      jest
        .spyOn(mockInvestorService, 'patchInvestorProfileByAdmin')
        .mockReturnValueOnce(of());

      const result: Observable<void> =
        await controller.patchInvestorProfileByAdmin(
          investorProfilePatchDto,
          1,
        );

      expect(result).toBeDefined();
      expect(
        mockInvestorService.patchInvestorProfileByAdmin,
      ).toHaveBeenCalledWith(investorProfilePatchDto, 1);
    });
  });
});
