import {
  Controller,
  UseGuards,
  Get,
  Param,
  Query,
  Patch,
  Body,
  HttpStatus,
  ParseFilePipeBuilder,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { BusinessOwnerService } from '../services/business-owner.service';
import { map, Observable } from 'rxjs';
import { BusinessOwnerGetAdminResponse } from '../models/business-owner-get-admin-response.interface';
import { BusinessOwnerGetDetailedAdminResponse } from '../models/business-owner-get-detailed-admin-response.interface';
import { MonthlyReportService } from '../services/monthly-report.service';
import { MonthlyReport } from '../entities/monthly-report.entity';
import { BusinessOwnerProfilePatchDto } from '../dto/business-owner-profile-update.dto';
import { BlockBusinessOwnerRequest } from '../dto/block-business-owner-request.dto';
import { DecideInvestmentRequest } from '../dto/decide-investment-request.dto';
import { BusinessOwnerSurveyAnswers } from '../models/business-owner-survey-answers.interface';
import { DecideMonthlyReport } from '../dto/decide-monthly-report.dto';
import { MonthlyReportAdminResponse } from '../models/monthly-report-admin-response.interface';
import { NewestMonthlyReportAdminResponse } from '../models/newest-monthly-report-admin-response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsCsvPipe } from '../../../helpers/is-csv.pipe';
import { IdentityScoreAdminResponse } from '../models/identity-score-admin-response.interface';

@ApiBearerAuth()
@Controller('admin-data/business-owners')
@ApiTags('Admin panel data')
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class BusinessOwnerAdminDataController {
  constructor(
    private readonly businessOwnerService: BusinessOwnerService,
    private readonly monthlyReportService: MonthlyReportService,
  ) {}

  @Get()
  @ApiQuery({ required: false, name: 'companyName' })
  @Roles(Role.Admin)
  @ApiOkResponse({ type: BusinessOwnerGetAdminResponse, isArray: true })
  getBusinessOwnersForAdmin(
    @Query('companyName') companyName?: string,
  ): Observable<BusinessOwnerGetAdminResponse[]> {
    return this.businessOwnerService.getBusinessOwnersForAdmin(companyName);
  }

  @Get(':id')
  @ApiOkResponse({ type: BusinessOwnerGetDetailedAdminResponse })
  @Roles(Role.Admin)
  getBusinessOwnerByIdForAdmin(
    @Param('id') id: number,
  ): Observable<BusinessOwnerGetDetailedAdminResponse> {
    return this.businessOwnerService.getBusinessOwnerForAdminById(id);
  }

  @Get(':id/identity-score')
  @ApiOkResponse({ type: IdentityScoreAdminResponse })
  @Roles(Role.Admin)
  getBusinessOwnersIdentityScore(
    @Param('id') id: number,
  ): Observable<IdentityScoreAdminResponse> {
    return this.businessOwnerService.getBusinessOwnersIdentityScore(id);
  }

  @Get(':id/survey-answers')
  @Roles(Role.Admin)
  getSurveyAnswersPdf(
    @Param('id') businessOwnerId: number,
  ): Observable<BusinessOwnerSurveyAnswers> {
    return this.businessOwnerService.getSurveyAnswers(businessOwnerId);
  }

  @Get(':id/monthly-reports')
  @ApiOkResponse({ type: MonthlyReport, isArray: true })
  @Roles(Role.Admin)
  getMonthlyReportsForAdmin(
    @Param('id') id: number,
  ): Observable<MonthlyReport[]> {
    return this.monthlyReportService.getMonthlyReportsForAdmin(id);
  }

  @Get(':id/newest-monthly-report')
  @Roles(Role.Admin)
  getBusinessOwnersNewestMonthlyReport(
    @Param('id') businessOwnerId: number,
  ): Observable<NewestMonthlyReportAdminResponse> {
    return this.businessOwnerService.getBusinessOwnersNewestMonthlyReport(
      businessOwnerId,
    );
  }

  @Get(':id/monthly-report')
  @Roles(Role.Admin)
  getBusinessOwnersMonthlyReport(
    @Param('id') businessOwnerId: number,
  ): Observable<MonthlyReportAdminResponse> {
    return this.businessOwnerService.getBusinessOwnersMonthlyReportForAdmin(
      businessOwnerId,
    );
  }

  @Patch(':id')
  @Roles(Role.Admin)
  blockOrUnblockBusinessOwner(
    @Param('id') businessOwnerId: number,
    @Body() blockBusinessOwner: BlockBusinessOwnerRequest,
  ): Observable<void> {
    return this.businessOwnerService.blockOrUnblockBusinessOwner(
      businessOwnerId,
      blockBusinessOwner,
    );
  }

  @Patch(':id/monthly-report')
  @Roles(Role.Admin)
  decideMonthlyReportUpdate(
    @Body() decideMonthlyReport: DecideMonthlyReport,
  ): Observable<void> {
    return (
      this, this.businessOwnerService.decideMonthlyReport(decideMonthlyReport)
    );
  }

  @Patch(':id/manual-processing')
  @Roles(Role.Admin)
  decideInvestmentRequestForManualProcessing(
    @Body() decideInvestmentRequest: DecideInvestmentRequest,
  ): Observable<void> {
    return this.businessOwnerService.decideInvestmentRequestForManualProcessing(
      decideInvestmentRequest,
    );
  }

  @Patch(':id/profile')
  patchProfile(
    @Body() bisnessOwnerPatchDto: BusinessOwnerProfilePatchDto,
    @Param('id') id: number,
  ): Observable<void> {
    return this.businessOwnerService
      .updateBusinessOwner(id, bisnessOwnerPatchDto)
      .pipe(map(() => {}));
  }

  @Put(':id/csv-upload')
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
  uploadReports(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(csv)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      new IsCsvPipe(),
    )
    file: Express.Multer.File,
    @Param('id') businessOwnerId: number,
  ): Observable<void> {
    return this.businessOwnerService.uploadReports(businessOwnerId, file);
  }
}
