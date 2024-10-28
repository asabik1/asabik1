import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { MoreThan, Repository } from 'typeorm';
import { BusinessSector } from '../entity/business-sector.entity';

@Injectable()
export class BusinessSectorRepository {
  constructor(
    @InjectRepository(BusinessSector)
    private readonly businessSectorsRepository: Repository<BusinessSector>,
  ) {}

  findAllBusinessSectors(): Observable<BusinessSector[]> {
    return from(this.businessSectorsRepository.find());
  }

  findBusinessSectorByBusinessId(
    businessId: number,
  ): Observable<BusinessSector[]> {
    return from(
      this.businessSectorsRepository.find({
        where: {
          business: {
            id: businessId,
          },
          businesSubsectors: MoreThan(0),
        },
      }),
    );
  }
}
