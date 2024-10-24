import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { LoanStatus } from '../../loan/enum/loan-status.enum';

export class UpdateLoanDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  nextPaymentDate: Date;

  @ApiProperty({ enum: LoanStatus })
  @IsEnum(LoanStatus)
  @IsNotEmpty()
  loanStatus: LoanStatus;
}
