import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { BusinessSubsector } from '../entity/business-subsector.entity';
import { BusinessSubsectorGetResponse } from '../models/business-subsector-get-response.interface';
import { BusinessSubsectorRepository } from '../repository/business-subsector.repository';

@Injectable()
export class BusinessSubsectorService {
  constructor(
    @InjectRepository(BusinessSubsector)
    private readonly businessSubsectorsRepository: Repository<BusinessSubsector>,
    private readonly businessSubsectorRepository: BusinessSubsectorRepository,
  ) {}

  getBusinessSubsectors(
    businessId: number,
    sectorId: number,
  ): Observable<BusinessSubsectorGetResponse[]> {
    return this.businessSubsectorRepository.findBusinessSubsectorBySectorId(
      businessId,
      sectorId,
    );
  }

  // findAll(): Observable<BusinessSubsector[]> {
  //   return from(this.businessSubsectorsRepository.find());
  // }

  // findByBusinessSubsectorId(
  //   businessSubsectorId: number,
  // ): Observable<BusinessSubsector> {
  //   return from(
  //     this.businessSubsectorsRepository.findOne({
  //       where: { id: businessSubsectorId },
  //     }),
  //   ).pipe(
  //     catchError((err) => {
  //       throw new HttpException(err, HttpStatus.NOT_FOUND);
  //     }),
  //   );
  // }

  // findBySectorId(
  //   businessId: number,
  //   sectorId: number,
  // ): Observable<BusinessSubsector[]> {
  //   return from(
  //     this.businessSubsectorsRepository
  //       .createQueryBuilder('subsector')
  //       .where({ businessSector: { id: sectorId } })
  //       .distinctOn(['name'])
  //       .distinct(true)
  //       .getMany(),
  //   );
  // }

  // createDraft(id: number) {
  //   return this.businessSubsectorsRepository.create({ id });
  // }
}
