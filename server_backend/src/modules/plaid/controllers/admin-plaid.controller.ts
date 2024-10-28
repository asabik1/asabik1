import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { PlaidService } from '../services/plaid.service';
import { LinkTokenCreateResponse } from 'plaid';
import { UpdateResult } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('admin-data/plaid')
@ApiTags('Admin panel data')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Roles(Role.Admin)
export class AdminPlaidController {
  constructor(private plaidService: PlaidService) {}

  @Get('link-token')
  getAdminLinkToken(): Observable<LinkTokenCreateResponse> {
    return this.plaidService.getAdminLinkToken();
  }

  @Post('access-token')
  setAdminsAccessToken(
    @Body() createAccessTokenDto: CreateAccessTokenDto,
  ): Observable<UpdateResult> {
    return this.plaidService.setAdminsAccessToken(createAccessTokenDto);
  }
}
