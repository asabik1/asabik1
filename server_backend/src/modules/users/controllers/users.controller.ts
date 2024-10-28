import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';
import { GetPayload } from '../decorators/get-payload.decorator';
import { EmailDto } from '../dto/email.dto';
import { Observable } from 'rxjs';
import { EmailConfirmationTokenDto } from '../dto/email-confirmation-token.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Payload } from '../models/payload-interface';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { GetUsersInfo } from '../models/get-users-info-interface';
import { User } from '../entities/users.entity';
import { CreateAppleUserDto } from '../dto/create-apple-user';
import { ConfirmEmailResponse } from '../dto/confirm-email-response.dto';
import { AdminCharts } from '../../business-owner/models/admin-charts.interface';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt']), RolesGuard)
  @Roles(Role.Admin)
  getInfoAboutUsers(): Observable<GetUsersInfo> {
    return this.usersService.getInfoAboutUsers();
  }

  @Get('/charts')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt']), RolesGuard)
  @Roles(Role.Admin)
  getMonthlyReportChartData(): Observable<AdminCharts> {
    return this.usersService.getAdminCharts();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  createUser(
    @Body() createUserDto: CreateUserDto,
    @GetPayload() payload: Payload,
  ): Observable<User> {
    return this.usersService.createUser(payload, createUserDto);
  }

  @Post('create-apple-user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  createAppleUser(
    @Body() createAppleUserDto: CreateAppleUserDto,
    @GetPayload() payload: Payload,
  ): Observable<User> {
    return this.usersService.createAppleUser(payload, createAppleUserDto);
  }

  @Post('confirmation-email')
  @ApiBearerAuth()
  sendConfirmationEmail(@Body() emailDto: EmailDto): Observable<void> {
    return this.usersService.sendConfirmationEmail(emailDto);
  }

  @Post(':userId/confirm-email')
  confirmEmail(
    @Body() tokenDto: EmailConfirmationTokenDto,
    @Param('userId') userId: number,
  ): Observable<ConfirmEmailResponse> {
    return this.usersService.confirmEmail(tokenDto, userId);
  }

  @Post('reset-password-email')
  sendResetPasswordEmail(@Body() emailDto: EmailDto): Observable<void> {
    return this.usersService.sendResetPasswordEmail(emailDto);
  }

  @Post(':userId/password')
  changePassword(
    @Body() passwordDto: UpdatePasswordDto,
    @Param('userId') userId: number,
  ): Observable<void> {
    return this.usersService.changePassword(passwordDto, userId);
  }
}
