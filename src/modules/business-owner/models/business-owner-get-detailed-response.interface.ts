import { ApiResponseProperty } from '@nestjs/swagger';
import { BusinessSubsectorDetailsGetResponse } from '../../business/models/business-subsector-details-get-response.interface';
import { InvestmentRequestGetInvestorResponse } from '../../investment-request/models/investment-request-get-investor-response.interface';
import { AdressResponse } from './adress.response.interface';

export class BusinessOwnerGetDetailedResponse {
  @ApiResponseProperty()
  imgUrl?: string;

  @ApiResponseProperty()
  companyName: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  ownerName: string;

  @ApiResponseProperty({ type: BusinessSubsectorDetailsGetResponse })
  businessSubsector: BusinessSubsectorDetailsGetResponse;

  @ApiResponseProperty()
  startDate: string;

  @ApiResponseProperty()
  avrMonthlySales: number;

  @ApiResponseProperty()
  avrMonthlyNetProfit: number;

  @ApiResponseProperty()
  totalLastYearNetProfit: number;

  @ApiResponseProperty()
  employeesNo: number;

  @ApiResponseProperty()
  phone: string;

  @ApiResponseProperty()
  website: string;

  @ApiResponseProperty({ type: () => AdressResponse })
  adress: AdressResponse;

  @ApiResponseProperty({ type: [InvestmentRequestGetInvestorResponse] })
  investmentRequests: InvestmentRequestGetInvestorResponse[];
}
