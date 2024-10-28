import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { BusinessSectorGetResponse } from '../models/business-sector-get-response.interface';
import { BusinessSubsectorGetResponse } from '../models/business-subsector-get-response.interface';
import { BusinessSectorService } from '../services/business-sector.service';
import { BusinessSubsectorService } from '../services/business-subsector.service';
import { BusinessService } from '../services/business.service';
import { BusinessGetResponse } from '../models/business-get-response.interface';

@ApiBearerAuth()
@Controller('businesses')
@ApiTags('businesses')
export class BusinessesController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly businessSectorService: BusinessSectorService,
    private readonly businessSubSectorService: BusinessSubsectorService,
  ) {}

  @Get()
  getBusinesses(): Observable<BusinessGetResponse[]> {
    return this.businessService.getBusinesses();
  }

  @Get(':businessId/sectors')
  getBusinessSectors(
    @Param('businessId', ParseIntPipe) businessId: number,
  ): Observable<BusinessSectorGetResponse[]> {
    return this.businessSectorService.getBusinessSectors(businessId);
  }

  @Get(':businessId/sectors/:sectorId/subsectors')
  getBusinessSubsectors(
    @Param('businessId', ParseIntPipe) businessId: number,
    @Param('sectorId', ParseIntPipe) sectorId: number,
  ): Observable<BusinessSubsectorGetResponse[]> {
    return this.businessSubSectorService.getBusinessSubsectors(
      businessId,
      sectorId,
    );
  }
}
