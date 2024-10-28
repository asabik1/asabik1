import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InvestorService } from '../services/investor.service';
import { InvestorGetResponse } from '../models/investor-get-response.interface';
import { Observable } from 'rxjs';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { InvestorDetailsGetResponse } from '../models/investor-details-get-response.interface';
import { InvestorProfilePatchDto } from '../dto/investor-profile-patch.dto';
import { BlockInvestorRequest } from '../dto/block-investor-request.dto';

@Controller('admin-data/investors')
@ApiTags('investors')
@ApiBearerAuth()
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOkResponse({ type: InvestorGetResponse, isArray: true })
  getInvestors(): Observable<InvestorGetResponse[]> {
    return this.investorService.getInvestors();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOkResponse({ type: InvestorDetailsGetResponse, isArray: true })
  getInvestorDetails(
    @Param('id') id: number,
  ): Observable<InvestorDetailsGetResponse> {
    return this.investorService.getInvestorDetails(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  blockOrUnblockInvestor(
    @Param('id') investorId: number,
    @Body() blockInvestorRequest: BlockInvestorRequest,
  ): Observable<void> {
    return this.investorService.blockOrUnblockInvestor(
      investorId,
      blockInvestorRequest,
    );
  }

  @Patch(':id/profile')
  patchInvestorProfileByAdmin(
    @Body() investorPatchDto: InvestorProfilePatchDto,
    @Param('id') id: number,
  ): Observable<void> {
    return this.investorService.patchInvestorProfileByAdmin(
      investorPatchDto,
      id,
    );
  }
}
