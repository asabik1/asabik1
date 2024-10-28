import { ApiProperty } from '@nestjs/swagger';

export class MonthlyReportRatingResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  givenMonth: string;

  @ApiProperty()
  monthlyIn: number;

  @ApiProperty()
  monthlyOut: number;
}
