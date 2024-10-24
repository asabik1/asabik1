import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Payload } from '../../users/models/payload-interface';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { PlaidService } from '../services/plaid.service';
import { IdentityVerificationStatus, LinkTokenCreateResponse } from 'plaid';
import { UpdateResult } from 'typeorm';

@Controller('plaid')
@ApiTags('plaid')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PlaidController {
  constructor(private plaidService: PlaidService) {}

  @Get('link-token')
  getLinkToken(
    @GetPayload() payload: Payload,
  ): Observable<LinkTokenCreateResponse> {
    return this.plaidService.getLinkToken(payload);
  }

  @Get('identity-verif-link')
  getIdentityVerificationLink(
    @GetPayload() payload: Payload,
  ): Observable<string> {
    return this.plaidService.getIdentityVerificationLink(payload.userId);
  }

  @Get('identity-verif-token')
  getIdentityVerificationToken(
    @GetPayload() payload: Payload,
  ): Observable<LinkTokenCreateResponse> {
    return this.plaidService.getIdentityVerificationToken();
  }

  @Get('verif-status')
  getVerificationStatus(
    @GetPayload() payload: Payload,
  ): Observable<IdentityVerificationStatus> {
    return this.plaidService.getVerificationStatus(payload.userId);
  }

  @Post('access-token')
  setAccessToken(
    @Body() createAccessTokenDto: CreateAccessTokenDto,
    @GetPayload() payload: Payload,
  ): Observable<UpdateResult> {
    return this.plaidService.setAccessToken(createAccessTokenDto, payload);
  }

  @Post('change-status')
  changeUserVerificationStatus(
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.plaidService.changeUserVerificationStatus(payload.userId);
  }
}
