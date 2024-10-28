import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { USERS_HTTP_RESPONSES } from '../enum/users.enum';
import { v4 as uuid } from 'uuid';
import {
  catchError,
  delayWhen,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { MailService } from '../../mail/services/mail.service';
import { InvestorService } from '../../investor/services/investor.service';
import { BusinessOwnerService } from '../../business-owner/services/business-owner.service';
import { Role } from '../../auth/enums/role.enum';
import { GetUsersInfo } from '../models/get-users-info-interface';
import { Payload } from '../models/payload-interface';
import { EmailDto } from '../dto/email.dto';
import { EmailConfirmationTokenDto } from '../dto/email-confirmation-token.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateAppleUserDto } from '../dto/create-apple-user';
import { ConfirmEmailResponse } from '../dto/confirm-email-response.dto';
import { AuthHttpResponses } from '../../auth/enums/auth.enum';
import { AdminCharts } from '../../business-owner/models/admin-charts.interface';
import { Investor } from 'src/modules/investor/entities/investor.entity';

@Injectable()
export class UsersService {
  logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
    private investorService: InvestorService,
    private businessOwnerService: BusinessOwnerService,
  ) {}

  getInfoAboutUsers(): Observable<GetUsersInfo> {
    return this.findAll().pipe(
      map((users: User[]) => {
        return {
          numberOfUsers: users.filter((user) => user.role !== Role.Admin)
            .length,
          numberOfBusinessOwners: users.filter((x) => x.businessOwner).length,
          numberOfInvestors: users.filter((x) => x.investor).length,
        };
      }),
    );
  }

  getAdminCharts(): Observable<AdminCharts> {
    return this.businessOwnerService.getAdminCharts();
  }

  createAppleUser(
    payload: Payload,
    createAppleUser: CreateAppleUserDto,
  ): Observable<User> {
    if (
      createAppleUser.role == Role.Admin &&
      (!payload || payload.role != Role.Admin)
    ) {
      throw new HttpException(
        'Only Admin can create new admin user',
        HttpStatus.FORBIDDEN,
      );
    }

    return from(
      this.usersRepository.findOne({
        where: { email: createAppleUser.email },
      }),
    ).pipe(
      tap((userByEmail) => {
        if (userByEmail) {
          throw new ConflictException(USERS_HTTP_RESPONSES.EMAIL_CONFLICT);
        }
      }),
      mergeMap(() =>
        this.usersRepository.findOne({
          where: { appleId: createAppleUser.appleId },
        }),
      ),
      tap((userByAppleId) => {
        if (userByAppleId) {
          throw new ConflictException(USERS_HTTP_RESPONSES.APPLE_ID_CONFLICT);
        }
      }),
      map(() =>
        this.usersRepository.create({
          ...createAppleUser,
          emailConfirmed: true,
          accountActivatationToken: uuid(),
        }),
      ),
      mergeMap((user) => {
        switch (user.role) {
          case Role.Investor: {
            return this.investorService
              .createInvestor({}, createAppleUser.name)
              .pipe(map((investor) => ({ ...user, investor })));
          }
          case Role.BusinessOwner: {
            return this.businessOwnerService
              .createBusinessOwner()
              .pipe(map((businessOwner) => ({ ...user, businessOwner })));
          }
          default: {
            return of(user);
          }
        }
      }),
      mergeMap((newUser) => this.usersRepository.save(newUser)),
      map((newUser) => {
        return {
          ...newUser,
          password: undefined,
          accountActivatationToken: undefined,
        };
      }),
    );
  }

  createUser(payload: Payload, createUserDto: CreateUserDto): Observable<User> {
    if (
      createUserDto.role == Role.Admin &&
      (!payload || payload.role != Role.Admin)
    ) {
      throw new HttpException(
        'Only Admin can create new admin user',
        HttpStatus.FORBIDDEN,
      );
    }

    return from(
      this.usersRepository.findOneBy({ email: createUserDto.email }),
    ).pipe(
      tap((isUserExist) => {
        if (isUserExist) {
          throw new ConflictException(USERS_HTTP_RESPONSES.EMAIL_CONFLICT);
        }
      }),
      mergeMap(() => from(bcrypt.hash(createUserDto.password, 12))),
      map((hashedPassword: string) =>
        this.usersRepository.create({
          ...createUserDto,
          password: hashedPassword,
          emailConfirmed: false,
          accountActivatationToken: uuid(),
        }),
      ),
      mergeMap((user) => {
        switch (user.role) {
          case Role.Investor: {
            return this.investorService
              .createInvestor()
              .pipe(map((investor) => ({ ...user, investor })));
          }
          case Role.BusinessOwner: {
            return this.businessOwnerService
              .createBusinessOwner()
              .pipe(map((businessOwner) => ({ ...user, businessOwner })));
          }
          default: {
            return of(user);
          }
        }
      }),
      mergeMap((newUser) => this.usersRepository.save(newUser)),
      tap((newUser) => this.mailService.sendConfirmation(newUser)),
      map((newUser) => {
        return {
          ...newUser,
          password: undefined,
          accountActivatationToken: undefined,
        };
      }),
    );
  }

  sendConfirmationEmail(emailDto: EmailDto): Observable<void> {
    return this.findByEmail(emailDto.email).pipe(
      tap((user) => {
        if (user.emailConfirmed) {
          throw new HttpException(
            'Email is already confirmed',
            HttpStatus.CONFLICT,
          );
        }
      }),
      mergeMap((user) => this.mailService.sendConfirmation(user)),
      map(() => {}),
    );
  }

  confirmEmail(
    tokenDto: EmailConfirmationTokenDto,
    userId: number,
  ): Observable<ConfirmEmailResponse> {
    let userFound: User;
    return this.findOne(userId).pipe(
      tap((user) => {
        if (user.accountActivatationToken != tokenDto.token) {
          throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
        userFound = user;
      }),
      mergeMap((user) => this.update(user.id, { emailConfirmed: true })),
      map(() => {
        return {
          role: userFound.role,
        };
      }),
    );
  }

  sendResetPasswordEmail(emailDto: EmailDto): Observable<void> {
    return this.findByEmail(emailDto.email).pipe(
      map((user) => {
        user.resetPasswordToken = uuid();
        return user;
      }),
      delayWhen((user) =>
        this.update(user.id, {
          resetPasswordToken: user.resetPasswordToken,
        }),
      ),
      mergeMap((user) => this.mailService.sendResetPasswordLink(user)),
      map(() => {}),
    );
  }

  changePassword(
    passwordDto: UpdatePasswordDto,
    userId: number,
  ): Observable<void> {
    return this.findOne(userId).pipe(
      tap((user) => {
        if (
          user.resetPasswordToken == '' ||
          user.resetPasswordToken != passwordDto.token
        ) {
          throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
      }),
      mergeMap(() => this.updatePassword(passwordDto.password, userId)),
      mergeMap(() => this.update(userId, { resetPasswordToken: '' })),
      map(() => {}),
    );
  }

  findOne(id: number): Observable<User> {
    return from(
      this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations: [
          'investor',
          'businessOwner',
          'businessOwner.image',
          'businessOwner.businessSubsector',
          'businessOwner.monthlyReports',
        ],
      }),
    ).pipe(
      catchError((err) => {
        throw new NotFoundException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
    );
  }

  removeUser(userId: number): Observable<User> {
    return this.findOne(userId).pipe(
      mergeMap((user) => this.usersRepository.remove(user)),
    );
  }

  getAdmin(): Observable<User> {
    return from(
      this.usersRepository.findOneOrFail({
        where: {
          role: Role.Admin,
        },
        order: { id: 'ASC' },
      }),
    ).pipe(
      catchError(() => {
        throw new NotFoundException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(
      this.usersRepository.find({
        relations: { businessOwner: true, investor: true },
      }),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(
      this.usersRepository.findOneOrFail({
        where: {
          email,
        },
        relations: ['businessOwner', 'investor'],
      }),
    ).pipe(
      catchError((err) => {
        throw new NotFoundException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
    );
  }

  findOneByEmail(email: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          email: email,
        },
      }),
    );
  }

  findOneOrFailByBusinessOwnerId(businessOwnerId: number): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: { businessOwner: { id: businessOwnerId } },
        relations: [
          'businessOwner.investmentRequests',
          'businessOwner.investmentRequests.loan',
        ],
      }),
    ).pipe(
      catchError((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      }),
    );
  }

  findByAppleId(appleId: string): Observable<User> {
    return from(
      this.usersRepository.findOneOrFail({
        where: {
          appleId,
        },
        relations: ['businessOwner', 'investor'],
      }),
    ).pipe(
      catchError((err) => {
        throw new NotFoundException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
    );
  }

  findOneByAppleId(appleId: string): Observable<User> {
    return from(
      this.usersRepository.findOne({
        where: {
          appleId: appleId,
        },
      }),
    );
  }

  update(userId: number, newUserData: Partial<User>): Observable<UpdateResult> {
    return from(this.usersRepository.findOneByOrFail({ id: userId })).pipe(
      catchError(() => {
        throw new ConflictException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
      mergeMap((user) => this.usersRepository.update(userId, newUserData)),
    );
  }

  updatePassword(newPasssword: string, userId: number): Observable<boolean> {
    return forkJoin({
      user: this.usersRepository.findOneByOrFail({ id: userId }),
      hashedPassword: bcrypt.hash(newPasssword, 12),
    }).pipe(
      catchError(() => {
        throw new ConflictException(USERS_HTTP_RESPONSES.NOT_FOUND);
      }),
      mergeMap((data) =>
        this.usersRepository.update(userId, {
          password: String(data.hashedPassword),
        }),
      ),
      map((user) => true),
    );
  }

  activate(email: string, token: string): Observable<User> {
    return this.findByEmail(email).pipe(
      map((user) => {
        if (user.emailConfirmed) {
          throw new ConflictException(AuthHttpResponses.ALREADY_ACTIVATED);
        } else if (user.accountActivatationToken !== token) {
          throw new BadRequestException(
            AuthHttpResponses.WRONG_ACTIVATION_TOKEN,
          );
        }
        user.emailConfirmed = true;
        return user;
      }),
      mergeMap((user) => this.usersRepository.save(user)),
    );
  }

  getAllActivatedOwners(): Observable<User[]> {
    return from(
      this.usersRepository.find({
        where: {
          plaidToken: Not(IsNull()),
          businessOwner: Not(IsNull()),
        },
        relations: ['businessOwner', 'investor'],
      }),
    );
  }

  getAllActivatedUsers(): Observable<User[]> {
    return from(
      this.usersRepository.find({
        where: {
          plaidToken: Not(IsNull()),
        },
        relations: ['businessOwner', 'investor'],
      }),
    );
  }

  freezeAccount(userId: number): Observable<void> {
    return this.update(userId, {
      isFrozenByUser: true,
    }).pipe(map(() => {}));
  }
}
