import { InjectRepository } from '@nestjs/typeorm';
import { IdentityScore } from '../entities/identity-score.entity';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

@Injectable()
export class IdentityScoreRepository {
  constructor(
    @InjectRepository(IdentityScore)
    private readonly identityScoreRepository: Repository<IdentityScore>,
  ) {}

  findIdentityScoreByBusinessOwnerId(
    businessOwnerId: number,
  ): Observable<IdentityScore> {
    return from(
      this.identityScoreRepository.findOne({
        where: {
          businessOwner: {
            id: businessOwnerId,
          },
        },
        relations: {
          businessOwner: true,
        },
      }),
    );
  }

  saveIdentityScore(
    identityScore: DeepPartial<IdentityScore>,
  ): Observable<IdentityScore> {
    return from(this.identityScoreRepository.save(identityScore));
  }

  updateIdentityScore(
    identityScoreId: number,
    identityScore: DeepPartial<IdentityScore>,
  ): Observable<UpdateResult> {
    return from(
      this.identityScoreRepository.update(identityScoreId, identityScore),
    );
  }
}
