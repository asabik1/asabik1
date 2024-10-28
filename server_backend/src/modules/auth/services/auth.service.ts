import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  catchError,
  EMPTY,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';
import {
  AuthActivateDto,
  AuthDecryptedTokenDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  AuthTokenDto,
} from '../dto/auth.dto';
import { CreateAppleSessionDto } from '../dto/create-apple-session.dto';
import { AuthHttpResponses } from '../enums/auth.enum';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string): Observable<User> {
    return this.usersService.findByEmail(email).pipe(
      catchError(() => {
        throw new HttpException(
          AuthHttpResponses.AUTH_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      }),
      map((user) => {
        if (user.isFrozenByUser) {
          throw new HttpException(
            AuthHttpResponses.ACCOUNT_FROZEN,
            HttpStatus.BAD_REQUEST,
          );
        } else if (!bcrypt.compareSync(password, user.password)) {
          throw new HttpException(
            AuthHttpResponses.AUTH_FAILED,
            HttpStatus.BAD_REQUEST,
          );
        }

        delete user.password;

        return user;
      }),
    );
  }

  validateAppleUser(
    createAppleSessionDto: CreateAppleSessionDto,
  ): Observable<User> {
    return this.usersService.findByAppleId(createAppleSessionDto.appleId).pipe(
      catchError(() => {
        throw new HttpException(
          AuthHttpResponses.APPLE_AUTH_FAILED,
          HttpStatus.NOT_FOUND,
        );
      }),
      map((user) => {
        if (user.isFrozenByUser) {
          throw new HttpException(
            AuthHttpResponses.ACCOUNT_FROZEN,
            HttpStatus.BAD_REQUEST,
          );
        }

        return user;
      }),
    );
  }

  createToken(payload): AuthTokenDto {
    const expiresIn: number = 3600 * 3;
    const accessToken = this.jwtService.sign(payload, { expiresIn });

    return new AuthTokenDto({
      expiresIn,
      accessToken,
    });
  }

  createForgotPasswordLink(forgotPasswordDetails: AuthForgotPasswordDto) {
    return from(
      this.usersService.findByEmail(forgotPasswordDetails.email),
    ).pipe(
      map((user) => {
        const token: string = jwt.sign(
          { id: user.id },
          process.env.JWT_RESET_SECRET,
          {
            expiresIn: '7d',
          },
        );
        const serverAddress = `${process.env.FRONT_END_URL}/auth/reset-password?token=${token}`;
        return { user, serverAddress, token };
      }),
      catchError((err) => {
        throwError(() => new BadRequestException(err.response.body.errors));
        return EMPTY;
      }),
    );
  }

  resetPassword(
    resetPasswordDetails: AuthResetPasswordDto,
  ): Observable<boolean> {
    if (!jwt.verify(resetPasswordDetails.token, process.env.JWT_RESET_SECRET)) {
      return from([false]);
    }

    const decryptedToken: jwt.JwtPayload | string = jwt.decode(
      resetPasswordDetails.token,
    ) as AuthDecryptedTokenDto;

    if (decryptedToken == null) return from([false]);
    return from(
      this.usersService.updatePassword(
        resetPasswordDetails.password,
        decryptedToken.id,
      ),
    ).pipe(map(() => true));
  }

  activateUser(authActivateDto: AuthActivateDto): Observable<boolean> {
    return from(
      this.usersService
        .activate(authActivateDto.email, authActivateDto.token)
        .pipe(map((user) => !!user)),
    );
  }
}
