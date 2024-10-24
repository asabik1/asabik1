import {
  Controller,
  UseGuards,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { BusinessOwnerService } from '../services/business-owner.service';
import { map, mergeMap, Observable } from 'rxjs';
import { BusinessOwnerProfilePatchDto } from '../dto/business-owner-profile-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsImagePipe } from '../../../helpers/is-image.pipe';
import { Payload } from '../../users/models/payload-interface';
import { BusinessOwnerProfileGetResponse } from '../models/business-owner-profile-get-response.interface';
import { BusinessOwnerProfilePreviewGetResponse } from '../models/business-owner-profile-preview-get-response.interface';
import { MonthlyReportRatingResponse } from '../models/monthly-report-rating-response.interface';
import { UpdateMonthlyReportDto } from '../dto/update-monthly-report.dto';
import { ConfirmMonthlyReportDto } from '../dto/confirm-monthly-report.dto';
import { BusinessOwnerAlertsResponse } from '../models/get-business-owner-alerts.interface';
import { ChartPoint } from '../models/chart-point.interface';

@ApiBearerAuth()
@ApiTags('business owners')
@Controller('business-owners/my/profile')
@Roles(Role.BusinessOwner)
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class BusinessOwneProfileController {
  constructor(private readonly businessOwnerService: BusinessOwnerService) {}

  @Put('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { limits: { files: 1 } }))
  uploadProfileImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      new IsImagePipe(),
    )
    file: Express.Multer.File,
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.businessOwnerService.uploadProfileImage(payload.userId, file);
  }

  @Patch()
  patchProfile(
    @Body() bisnessOwnerPatchDto: BusinessOwnerProfilePatchDto,
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.businessOwnerService.patchProfile(
      payload.businessOwnerId,
      bisnessOwnerPatchDto,
    );
  }

  @Delete('image')
  deleteFileById(@GetPayload() payload: Payload): Observable<void> {
    return this.businessOwnerService.deleteProfileImage(
      payload.userId,
      payload.businessOwnerId,
    );
  }

  @Get()
  @ApiOkResponse({ type: BusinessOwnerProfileGetResponse })
  getBusinessOwnersProfile(
    @GetPayload() payload: Payload,
  ): Observable<BusinessOwnerProfileGetResponse> {
    return this.businessOwnerService.getBusinessOwnersProfile(
      payload.businessOwnerId,
    );
  }

  @Get('preview')
  @ApiOkResponse({ type: BusinessOwnerProfilePreviewGetResponse })
  getBusinessOwnerProfilePreview(
    @GetPayload() payload: Payload,
  ): Observable<BusinessOwnerProfilePreviewGetResponse> {
    return this.businessOwnerService.getBusinessOwnersProfilePreview(
      payload.businessOwnerId,
    );
  }

  @Get('monthly-report')
  @ApiOkResponse({ type: MonthlyReportRatingResponse })
  getBusinessOwnersMonthlyReport(
    @GetPayload() payload: Payload,
  ): Observable<MonthlyReportRatingResponse> {
    return this.businessOwnerService.getBusinessOwnersMonthlyReport(
      payload.businessOwnerId,
    );
  }

  @Get('alerts')
  @ApiOkResponse({ type: BusinessOwnerAlertsResponse })
  getBusinessOwnerAlerts(
    @GetPayload() payload: Payload,
  ): Observable<BusinessOwnerAlertsResponse> {
    return this.businessOwnerService.getBusinessOwnerAlerts(
      payload.businessOwnerId,
    );
  }

  @Get('monthly-report-chart')
  @ApiOkResponse({ type: ChartPoint, isArray: true })
  getMonthlyReportChartData(
    @GetPayload() payload: Payload,
  ): Observable<ChartPoint[]> {
    return this.businessOwnerService.getMonthlyReportChartData(
      payload.businessOwnerId,
    );
  }

  @Post('monthly-report')
  updateBusinessOwnersMonthlyReport(
    @Body() updateMonthlyReportDto: UpdateMonthlyReportDto,
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.businessOwnerService.updateBusinessOwnersMonthlyReport(
      updateMonthlyReportDto,
      payload.businessOwnerId,
    );
  }

  @Patch('monthly-report')
  confirmMonthlyReport(
    @Body() confirmMonthlyReportDto: ConfirmMonthlyReportDto,
  ): Observable<void> {
    return this.businessOwnerService.confirmMonthlyReportByBusinessOwner(
      confirmMonthlyReportDto,
    );
  }

  @Delete()
  deleteBusinessOwner(@GetPayload() payload: Payload): Observable<void> {
    return this.businessOwnerService.deleteBusinessOwner(payload);
  }
}
