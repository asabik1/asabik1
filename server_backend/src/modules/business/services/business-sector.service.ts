import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { MoreThan, Repository } from 'typeorm';
import { BusinessSector } from '../entity/business-sector.entity';
import { BusinessSectorGetResponse } from '../models/business-sector-get-response.interface';
import { BusinessSectorRepository } from '../repository/business-sector.repository';

@Injectable()
export class BusinessSectorService {
  constructor(
    @InjectRepository(BusinessSector)
    private readonly businessSectorsRepository: Repository<BusinessSector>,
    private readonly businessSectorRepository: BusinessSectorRepository,
  ) {}

  getBusinessSectors(
    businessId: number,
  ): Observable<BusinessSectorGetResponse[]> {
    return this.businessSectorRepository.findBusinessSectorByBusinessId(
      businessId,
    );
  }

  // findAll(): Observable<BusinessSector[]> {
  //   return from(this.businessSectorsRepository.find());
  // }

  // findByBusinessId(businessId: number): Observable<BusinessSector[]> {
  //   return from(
  //     this.businessSectorsRepository.find({
  //       where: { business: { id: businessId }, businesSubsectors: MoreThan(0) },
  //     }),
  //   );
  // }
}
