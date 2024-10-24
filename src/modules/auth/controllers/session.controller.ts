import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, tap } from 'rxjs';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionService } from '../services/session.service';
import { CreateUserSessionResponse } from '../models/create-session-respons.interface';
import { CreateAppleSessionDto } from '../dto/create-apple-session.dto';

@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Observable<CreateUserSessionResponse> {
    return this.sessionService.createSession(createSessionDto);
  }

  @Post('apple-signin')
  createAppleSession(
    @Body() createAppleSessionDto: CreateAppleSessionDto,
  ): Observable<CreateUserSessionResponse> {
    return this.sessionService.createAppleSession(createAppleSessionDto);
  }
}
