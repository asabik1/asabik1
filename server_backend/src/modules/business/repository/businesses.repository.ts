import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../entity/business.entity';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessRepository {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  findAllBusinesses(): Observable<Business[]> {
    return from(this.businessRepository.find());
  }
}
