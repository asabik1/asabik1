import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, ValidateIf } from 'class-validator';

export class InvestorProfilePatchDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => 'fullName' in o)
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => 'companyName' in o)
  companyName?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsNotEmpty()
  @ValidateIf((o) => 'website' in o)
  website?: string;
}
