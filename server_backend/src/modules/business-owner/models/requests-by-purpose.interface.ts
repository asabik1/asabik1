import { ApiResponseProperty } from '@nestjs/swagger';
import { LoanPurpose } from '../../investment-request/enum/loan-purpose.enum';

export class RequestsByPurpose {
  @ApiResponseProperty()
  purpose: LoanPurpose;

  @ApiResponseProperty()
  count: number;
}
