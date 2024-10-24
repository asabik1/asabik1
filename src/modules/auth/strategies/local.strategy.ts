import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { from, Observable, tap, throwError } from 'rxjs';
import { User } from '../../users/entities/users.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string): Observable<User> {
    return from(this.authService.validateUser(email, password)).pipe(
      tap((user) => {
        if (!user || !user.emailConfirmed) {
          throwError(
            () =>
              new UnauthorizedException(
                'User not found, activated or the password does not match',
              ),
          );
        }
      }),
    );
  }
}
