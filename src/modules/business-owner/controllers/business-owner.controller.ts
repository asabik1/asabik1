import { Controller, UseGuards, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { BusinessOwnerService } from '../services/business-owner.service';
import { Observable } from 'rxjs';
import { BusinessOwnerGetResponse } from '../models/business-owner-get-response.interface';
import { BusinessOwnerGetDetailedResponse } from '../models/business-owner-get-detailed-response.interface';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Payload } from '../../users/models/payload-interface';

@ApiBearerAuth()
@Controller('business-owners')
@ApiTags('business owners')
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class BusinessOwnerController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Get()
  @ApiQuery({ required: false, name: 'companyName' })
  @Roles(Role.Investor)
  @ApiOkResponse({ type: BusinessOwnerGetResponse, isArray: true })
  getBusinessOwners(
    @GetPayload() payload: Payload,
    @Query('companyName') companyName?: string,
  ): Observable<BusinessOwnerGetResponse[]> {
    return this.businessOwnerService.getBusinessOwners(payload, companyName);
  }

  @Get(':id')
  @ApiOkResponse({
    type: BusinessOwnerGetDetailedResponse,
    isArray: false,
  })
  @Roles(Role.Investor)
  getBusinessOwnerByIdForInvestor(
    @Param('id') id: number,
  ): Observable<BusinessOwnerGetDetailedResponse> {
    return this.businessOwnerService.getBusinessOwnerByBusinessOwnerIdForInvestor(
      id,
    );
  }
}
