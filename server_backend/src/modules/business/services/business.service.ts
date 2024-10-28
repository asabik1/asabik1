import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BusinessGetResponse } from '../models/business-get-response.interface';
import { BusinessRepository } from '../repository/businesses.repository';

@Injectable()
export class BusinessService {
  constructor(private readonly businessRepository: BusinessRepository) {}

  getBusinesses(): Observable<BusinessGetResponse[]> {
    return this.businessRepository.findAllBusinesses();
  }
}
