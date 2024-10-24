import { Controller, Get, Param, Query } from '@nestjs/common';
import { GuestService } from '../services/guest.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { BusinessOwnerGetDetailedResponse } from '../../business-owner/models/business-owner-get-detailed-response.interface';
import { BusinessOwnerGetResponse } from '../../business-owner/models/business-owner-get-response.interface';

@Controller('guest')
@ApiTags('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  @ApiQuery({ required: false, name: 'companyName' })
  @ApiOkResponse({ type: BusinessOwnerGetResponse, isArray: true })
  getBusinessOwnersForGuest(
    @Query('companyName') companyName?: string,
  ): Observable<BusinessOwnerGetResponse[]> {
    return this.guestService.getBusinessOwnersForGuest(companyName);
  }

  @Get(':id')
  @ApiOkResponse({ type: BusinessOwnerGetDetailedResponse, isArray: false })
  getBusinessOwnerByIdForGuest(
    @Param('id') id: number,
  ): Observable<BusinessOwnerGetDetailedResponse> {
    return this.guestService.getBusinessOwnerByIdForGuest(id);
  }
}
