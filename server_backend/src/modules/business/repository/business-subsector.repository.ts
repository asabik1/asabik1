import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from } from 'rxjs';
import { Repository } from 'typeorm';
import { BusinessSubsector } from '../entity/business-subsector.entity';

@Injectable()
export class BusinessSubsectorRepository {
  constructor(
    @InjectRepository(BusinessSubsector)
    private readonly businessSubsectorRepository: Repository<BusinessSubsector>,
  ) {}

  findAllBusinessSubsectors(): Observable<BusinessSubsector[]> {
    return from(this.businessSubsectorRepository.find());
  }

  findBusinessSubsectorsByBusinessSubsectorId(
    businessSubsectorId: number,
  ): Observable<BusinessSubsector> {
    return from(
      this.businessSubsectorRepository.findOne({
        where: { id: businessSubsectorId },
      }),
    ).pipe(
      catchError((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      }),
    );
  }

  findBusinessSubsectorBySectorId(
    businessId: number,
    sectorId: number,
  ): Observable<BusinessSubsector[]> {
    return from(
      this.businessSubsectorRepository
        .createQueryBuilder('subsector')
        .where({ businessSector: { id: sectorId } })
        .distinctOn(['name'])
        .distinct(true)
        .getMany(),
    );
  }

  createDraft(id: number) {
    return this.businessSubsectorRepository.create({ id });
  }
}
