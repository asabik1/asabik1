import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, mergeMap, Observable, tap } from 'rxjs';
import { CreateSessionDto } from '../dto/create-session.dto';
import { AuthService } from './auth.service';
import { User } from '../../users/entities/users.entity';
import { CreateUserSessionResponse } from '../models/create-session-respons.interface';
import { Payload } from '../../users/models/payload-interface';
import { CreateAppleSessionDto } from '../dto/create-apple-session.dto';
import { SurveyStatus } from '../../survey/models/survey-status.enum';

@Injectable()
export class SessionService {
  constructor(private readonly authService: AuthService) {}

  createSession(
    userDto: CreateSessionDto,
  ): Observable<CreateUserSessionResponse> {
    let user: User;
    return this.authService.validateUser(userDto.email, userDto.password).pipe(
      tap((user) => {
        if (user.surveyStatus == SurveyStatus.NOT_QUALIFIES) {
          throw new HttpException(
            'Your company does not qualify for the Asabik platform.',
            HttpStatus.FORBIDDEN,
          );
        } else if (user.surveyStatus == SurveyStatus.BLOCKED) {
          throw new HttpException(
            'Your account has been blocked.',
            HttpStatus.FORBIDDEN,
          );
        }
      }),
      map((userData: User) => {
        user = userData;
        return {
          userId: user.id,
          email: user.email,
          emailConfirmed: user.emailConfirmed,
          updatedAt: user.updatedAt.toISOString(),
          createdAt: user.createdAt.toISOString(),
          role: user.role,
          investorId: user?.investor?.id,
          businessOwnerId: user?.businessOwner?.id,
        };
      }),
      mergeMap((payload: Payload) =>
        from([this.authService.createToken(payload)]),
      ),
      map((tokens) => {
        return {
          isAppleUser: false,
          tokens,
          name:
            user?.investor?.fullName ?? user?.businessOwner?.ownerName ?? '',
          email: user.email,
          role: user.role,
          emailConfirmed: user.emailConfirmed,
          surveyStatus: user.surveyStatus,
          plaidLink: !!user.plaidToken,
        };
      }),
    );
  }

  createAppleSession(
    createAppleSessionDto: CreateAppleSessionDto,
  ): Observable<CreateUserSessionResponse> {
    let user: User;
    return this.authService.validateAppleUser(createAppleSessionDto).pipe(
      tap((user) => {
        if (user.surveyStatus == SurveyStatus.NOT_QUALIFIES) {
          throw new HttpException(
            'Your company does not qualify for the Asabik platform.',
            HttpStatus.FORBIDDEN,
          );
        } else if (user.surveyStatus == SurveyStatus.BLOCKED) {
          throw new HttpException(
            'Your account has been blocked.',
            HttpStatus.FORBIDDEN,
          );
        }
      }),
      map((userData: User) => {
        user = userData;
        return {
          userId: user.id,
          email: user.email,
          emailConfirmed: user.emailConfirmed,
          updatedAt: user.updatedAt.toISOString(),
          createdAt: user.createdAt.toISOString(),
          role: user.role,
          investorId: user?.investor?.id,
          businessOwnerId: user?.businessOwner?.id,
        };
      }),
      mergeMap((payload: Payload) =>
        from([this.authService.createToken(payload)]),
      ),
      map((tokens) => {
        return {
          isAppleUser: true,
          tokens,
          name:
            user?.investor?.fullName ?? user?.businessOwner?.ownerName ?? '',
          email: user.email,
          role: user.role,
          emailConfirmed: user.emailConfirmed,
          surveyStatus: user.surveyStatus,
          plaidLink: !!user.plaidToken,
        };
      }),
    );
  }
}
