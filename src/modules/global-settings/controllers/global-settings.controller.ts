import { Controller, UseGuards, Get, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UpdateGlobalSettingsDto } from '../dto/global-settings-update.dto';
import { GlobalSettingsService } from '../services/global-settings.service';
import { GetGlobalSettingsResponse } from '../models/global-settings-response.interface';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Payload } from '../../users/models/payload-interface';
import { UserIdentity } from '../../plaid/models/user-identy.interface';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { RatingSettingsService } from '../services/rating-settings.service';
import { RangesResponse } from '../models/ranges-response.interface';

@ApiBearerAuth()
@Controller('admin-data/global-settings')
@ApiTags('Admin panel data')
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class GlobalSettingsController {
  constructor(
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly ratingSettingsService: RatingSettingsService,
  ) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: GetGlobalSettingsResponse,
    isArray: false,
  })
  getGlobalSettings(): Observable<GetGlobalSettingsResponse> {
    return this.globalSettingsService.getGlobalSettings();
  }

  @Get('ratings')
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: RangesResponse,
    isArray: false,
  })
  getRatings(): Observable<RangesResponse> {
    return this.ratingSettingsService.getRatings();
  }

  @Get('payment-data')
  @ApiOkResponse()
  @Roles(Role.Admin)
  getAdminPaymentData(
    @GetPayload() payload: Payload,
  ): Observable<UserIdentity> {
    return this.globalSettingsService.getAdminPaymentData(payload.userId);
  }

  @Patch()
  @Roles(Role.Admin)
  updateGlobalSettings(
    @Body() updateGlobalSettingDto: UpdateGlobalSettingsDto,
  ): Observable<void> {
    return this.globalSettingsService.updateGlobalSettings(
      updateGlobalSettingDto,
    );
  }

  @Patch('ratings')
  @Roles(Role.Admin)
  updateRanges(@Body() updateRatings: UpdateRatingDto): Observable<void> {
    return this.ratingSettingsService.updateRanges(updateRatings);
  }
}
