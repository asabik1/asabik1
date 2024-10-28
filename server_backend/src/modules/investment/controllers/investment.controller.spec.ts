import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from '../services/investment.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { Observable, of } from 'rxjs';
import { payload } from '../../../../mocks/payload.mock';

const mockInvestmentService = {
  invest: jest.fn(() => of()),
};

describe('InvestmentController', () => {
  let controller: InvestmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentController],
      providers: [
        {
          provide: InvestmentService,
          useValue: mockInvestmentService,
        },
      ],
    })
      .overrideGuard(AuthGuard(['jwt']))
      .useValue({})
      .overrideGuard(RolesGuard)
      .useValue({})
      .compile();

    controller = module.get<InvestmentController>(InvestmentController);
  });

  describe('invest', () => {
    it('should return void when investment is successful', async () => {
      const createInvestmentDto: CreateInvestmentDto = {
        investmentRequestId: 1,
        amount: 1000,
      };

      const ip = '127.0.0.1';

      jest.spyOn(mockInvestmentService, 'invest').mockReturnValueOnce(of());

      const result: Observable<void> = await controller.invest(
        createInvestmentDto,
        payload,
        ip,
      );

      expect(result).toBeDefined();
      expect(mockInvestmentService.invest).toHaveBeenCalledWith(
        payload,
        createInvestmentDto,
        ip,
      );
    });
  });
});
