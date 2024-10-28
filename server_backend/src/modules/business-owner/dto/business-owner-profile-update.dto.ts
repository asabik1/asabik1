import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class BusinessOwnerProfilePatchDto {
  @ApiProperty({ required: false })
  @ValidateIf((o) => 'companyName' in o)
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'ownerName' in o)
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'street' in o)
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'city' in o)
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'zipCode' in o)
  @IsPostalCode('US')
  zipCode: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'phone' in o)
  @IsPhoneNumber('US')
  phone: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'website' in o)
  website?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => 'description' in o)
  @IsString()
  @MinLength(500)
  @MaxLength(2400)
  @IsNotEmpty()
  description: string;
}
