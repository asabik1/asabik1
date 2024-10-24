import { ApiProperty } from '@nestjs/swagger';
import { BusinessSubsectorDetailsGetResponse } from '../../business/models/business-subsector-details-get-response.interface';
import { InvestmentRequestGetInvestorResponse } from '../../investment-request/models/investment-request-get-investor-response.interface';
import { InvestmentRequestsSummaryResponse } from './investment-requests-summary-response';

export class BusinessOwnerProfilePreviewGetResponse {
  @ApiProperty({ required: false })
  imgUrl?: string;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false })
  ownerName?: string;

  @ApiProperty({ required: false })
  street?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  zipCode?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty({ type: BusinessSubsectorDetailsGetResponse })
  businessSubsector: BusinessSubsectorDetailsGetResponse;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  avrMonthlySales: number;

  @ApiProperty()
  avrMonthlyNetProfit: number;

  @ApiProperty()
  totalLastYearNetProfit: number;

  @ApiProperty()
  employeesNo: number;

  @ApiProperty({ required: false })
  businessDescription?: string;

  @ApiProperty({ type: InvestmentRequestGetInvestorResponse, isArray: true })
  investmentRequests: InvestmentRequestGetInvestorResponse[];

  @ApiProperty()
  isProfileComplete: boolean;

  @ApiProperty()
  isValidForRequest: boolean;

  @ApiProperty({ type: InvestmentRequestsSummaryResponse })
  investmentsRequestsSummary: InvestmentRequestsSummaryResponse;
}
