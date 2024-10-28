import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentRequestController } from './investment-request.controller';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { LoanService } from '../../loan/services/loan.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { payload } from '../../../../mocks/payload.mock';
import { UpdateInvestmentRequestDto } from '../dto/investment-request-update.dto';
import { CreateInvestmentRequestDto } from '../dto/investment-request-create.dto';
import { LoanPurpose } from '../enum/loan-purpose.enum';
import { CreditRatingDataResponse } from '../models/credit-rating-data-response.interface';
import { Rating } from '../enum/rating.enum';
import { InvestmentRequestGetDetailedResponse } from '../models/investment-request-get-detailed-response.interface';
import { InvestmentRequestGetBusinessOwnerResponse } from '../models/investment-request-get-business-owner-response.interface';
import { INVESTMENT_REQUEST_STATUS } from '../enum/investment-status-message.enum';

const mockInvestmentRequestService = {
  getAllinvestmentRequests: jest.fn(() => of([])),
  getInvestmentRequestDetails: jest.fn(() => of({})),
  getCreditRatingDataResponse: jest.fn(() => of({})),
  createInvestmentRequest: jest.fn(() => of('success')),
  updateInvestmentRequest: jest.fn(() => of()),
  acceptLoan: jest.fn(() => of('success')),
  declineLoan: jest.fn(() => of('success')),
  extendRaisingTime: jest.fn(() => of()),
  deleteInvestmentRequest: jest.fn(() => of()),
};

const mockLoanService = {
  getLastLoanForBusinessOwner: jest.fn(() => of({})),
  getLastLoanForInvestor: jest.fn(() => of({})),
};

describe('InvestmentRequestController', () => {
  let controller: InvestmentRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentRequestController],
      providers: [
        {
          provide: InvestmentRequestService,
          useValue: mockInvestmentRequestService,
        },
        {
          provide: LoanService,
          useValue: mockLoanService,
        },
      ],
    }).compile();

    controller = module.get<InvestmentRequestController>(
      InvestmentRequestController,
    );
  });

  describe('getAllinvestmentRequests', () => {
    it('should return an array of investment requests', async () => {
      const result: InvestmentRequestGetBusinessOwnerResponse[] = [
        {
          id: 1,
          purposeOfTheLoan: LoanPurpose.ExpandBusiness,
          loanPurpose: 'Expanding the business operations',
          helpIncreaseProfit: 'Yes, by investing in new machinery',
          profitIncrease: 15_000,
          returnTerm: 12,
          requiredCapital: 50_000,
          netReturn: 10_000,
          netReturnToShare: 9_000,
          status: INVESTMENT_REQUEST_STATUS.REJECTED,
          percentageRaised: 60,
          timeLeft: '0d, 0h, 0min',
          isEligible: true,
          canEdit: true,
        },
      ];

      jest
        .spyOn(mockInvestmentRequestService, 'getAllinvestmentRequests')
        .mockReturnValueOnce(of(result));

      const response: InvestmentRequestGetBusinessOwnerResponse[] =
        await firstValueFrom(controller.getAllinvestmentRequests(payload));

      expect(response).toEqual(result);
      expect(
        mockInvestmentRequestService.getAllinvestmentRequests,
      ).toHaveBeenCalledWith(payload);
    });
  });

  describe('getInvestmentRequest', () => {
    it('should return detailed information about an investment request', async () => {
      const investmentRequestId = 1;
      const result: InvestmentRequestGetDetailedResponse = {
        id: 1,
        psr: '12.125%',
        projectedNetReturn: '2500.00',
        nextInstallmentAmount: 1000,
        nextInstallmentDate: '2024-02-15',
        nextPlaidVerifDate: '2024-02-10',
        finalPaymentAmount: 5000,
        finalPaymentDate: '2024-04-01',
        dti: '0.35',
        rating: Rating.A2,
        approvedAt: '2024-01-28T14:30:00Z',
      };

      jest
        .spyOn(mockInvestmentRequestService, 'getInvestmentRequestDetails')
        .mockReturnValueOnce(of(result));

      const response: InvestmentRequestGetDetailedResponse =
        await firstValueFrom(
          controller.getInvestmentRequest(investmentRequestId, payload),
        );

      expect(response).toEqual(result);
      expect(
        mockInvestmentRequestService.getInvestmentRequestDetails,
      ).toHaveBeenCalledWith(investmentRequestId, payload.businessOwnerId);
    });
  });

  describe('getCreditRatingDataResponse', () => {
    it('should return credit rating data for an investment request', async () => {
      const investmentRequestId = 1;
      const ratingData: CreditRatingDataResponse = {
        psr: '12.175%',
        r: 0.85,
        m: 0.75,
        a: 0.65,
        returnTerm: 12,
        requestedAmount: 20000,
        netReturn: 5000,
        netReturnToShare: 4500,
        totalNoMonth: 24,
        outflowExceed: 2,
        negativeBalance: 3,
        noEarning: 1,
        vInflow: 18000,
        vTotal: 16000,
        averageE: 0.8,
        averageL: 0.7,
        o: 0.9,
        i: 0.85,
        d1: 0.92,
        d2: 0.88,
        d0: 0.94,
        pod: 0.96,
        maxLoanCalc: 25000,
        rating: Rating.A1,
        low: 0.7,
        high: 0.95,
      };

      jest
        .spyOn(mockInvestmentRequestService, 'getCreditRatingDataResponse')
        .mockReturnValueOnce(of(ratingData));

      const response: CreditRatingDataResponse = await firstValueFrom(
        controller.getCreditRatingDataResponse(investmentRequestId),
      );

      expect(response).toEqual(ratingData);
      expect(
        mockInvestmentRequestService.getCreditRatingDataResponse,
      ).toHaveBeenCalledWith(investmentRequestId);
    });
  });

  describe('createInvestmentRequest', () => {
    it('should create a new investment request and return success message', async () => {
      const investmentRequestDto: CreateInvestmentRequestDto = {
        purposeOfTheLoan: LoanPurpose.Emergency,
        requiredCapital: 2_000,
        returnTerm: 12,
        netReturn: 500,
        netReturnToShare: 100,
        loanPurpose: 'Sample loan purpose',
        helpIncreaseProfit: 'Sample help in increasing profit',
        profitIncrease: 5_000,
      };
      const result = 'success';

      jest
        .spyOn(mockInvestmentRequestService, 'createInvestmentRequest')
        .mockReturnValueOnce(of(result));

      const response: string = await firstValueFrom(
        controller.createInvestmentRequest(investmentRequestDto, payload),
      );

      expect(response).toEqual(result);
      expect(
        mockInvestmentRequestService.createInvestmentRequest,
      ).toHaveBeenCalledWith(payload.businessOwnerId, investmentRequestDto);
    });
  });

  describe('updateInvestmentRequest', () => {
    it('should update an existing investment request', async () => {
      const updateDto: UpdateInvestmentRequestDto = {
        loanPurpose: 'Sample purpose',
        helpIncreaseProfit: 'Sample help in increasing profit',
        netReturn: 200,
        netReturnToShare: 50,
      };
      const investmentRequestId = 16;

      jest
        .spyOn(mockInvestmentRequestService, 'updateInvestmentRequest')
        .mockReturnValueOnce(of());

      const response: Observable<void> =
        await controller.updateInvestmentRequest(
          updateDto,
          investmentRequestId,
          payload,
        );

      expect(response).toBeDefined();
      expect(
        mockInvestmentRequestService.updateInvestmentRequest,
      ).toHaveBeenCalledWith(updateDto, investmentRequestId, payload);
    });
  });

  describe('acceptLoan', () => {
    it('should accept a loan for an investment request and return success message', async () => {
      const investmentRequestId = 1;
      const ip = '127.0.0.1';
      const result = 'success';

      jest
        .spyOn(mockInvestmentRequestService, 'acceptLoan')
        .mockReturnValueOnce(of(result));

      const response: string = await firstValueFrom(
        controller.acceptLoan(investmentRequestId, payload, ip),
      );

      expect(response).toEqual(result);
      expect(mockInvestmentRequestService.acceptLoan).toHaveBeenCalledWith(
        investmentRequestId,
        payload,
        ip,
      );
    });
  });

  describe('declineLoan', () => {
    it('should decline a loan for an investment request and return success message', async () => {
      const investmentRequestId = 1;
      const result = 'success';

      jest
        .spyOn(mockInvestmentRequestService, 'declineLoan')
        .mockReturnValueOnce(of(result));

      const response: string = await firstValueFrom(
        controller.declineLoan(investmentRequestId),
      );

      expect(response).toEqual(result);
      expect(mockInvestmentRequestService.declineLoan).toHaveBeenCalledWith(
        investmentRequestId,
      );
    });
  });

  describe('extendRaisingTime', () => {
    it('should extend the raising time for an investment request', async () => {
      const investmentRequestId = 1;
      jest
        .spyOn(mockInvestmentRequestService, 'extendRaisingTime')
        .mockReturnValueOnce(of());

      const response: Observable<void> = await controller.extendRaisingTime(
        investmentRequestId,
      );

      expect(response).toBeDefined();
      expect(
        mockInvestmentRequestService.extendRaisingTime,
      ).toHaveBeenCalledWith(investmentRequestId);
    });
  });

  describe('deleteInvestmentRequest', () => {
    it('should delete an investment request', async () => {
      const investmentRequestId = 1;

      jest
        .spyOn(mockInvestmentRequestService, 'deleteInvestmentRequest')
        .mockReturnValueOnce(of());

      const response: Observable<void> =
        await controller.deleteInvestmentRequest(investmentRequestId);

      expect(response).toBeDefined();
      expect(
        mockInvestmentRequestService.deleteInvestmentRequest,
      ).toHaveBeenCalledWith(investmentRequestId);
    });
  });
});
