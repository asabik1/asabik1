import {
  Controller,
  UseGuards,
  Get,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Observable } from 'rxjs';
import { InvestorProfilePatchDto } from '../dto/investor-profile-patch.dto';
import { InvestorService } from '../services/investor.service';
import { InvestorProfileGetResponse } from '../models/investor-profile-get-response.interface';
import { Payload } from '../../users/models/payload-interface';

@ApiBearerAuth()
@ApiTags('investors')
@Controller('investors/my/profile')
@Roles(Role.Investor)
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class InvestorProfileController {
  constructor(private readonly investorService: InvestorService) {}

  @Get()
  @ApiOkResponse({ type: InvestorProfileGetResponse })
  getInvestorProfile(
    @GetPayload() payload: Payload,
  ): Observable<InvestorProfileGetResponse> {
    return this.investorService.getInvestorProfile(payload);
  }

  @Patch()
  patchInvestorProfile(
    @Body() investorProfilePatchDto: InvestorProfilePatchDto,
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.investorService.patchInvestorProfile(
      investorProfilePatchDto,
      payload,
    );
  }

  @Delete()
  deleteInvestor(@GetPayload() payload: Payload): Observable<void> {
    return this.investorService.deleteInvestor(payload);
  }
}
