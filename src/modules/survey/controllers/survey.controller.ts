import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { BusinessOwnerSurveyDto } from '../dto/business-owner-survey.dto';
import { InvestorSurveyDto } from '../dto/investor-survey.dto';
import { SurveyStatus } from '../models/survey-status.enum';
import { Payload } from '../../users/models/payload-interface';
import { SurveyService } from '../services/survey.service';

@Controller('surveys')
@ApiTags('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('investor')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt']), RolesGuard)
  @Roles(Role.Investor)
  investorCompleteSurvey(
    @Body() surveyDto: InvestorSurveyDto,
    @GetPayload() payload: Payload,
  ): Observable<{
    surveyStatus: SurveyStatus;
  }> {
    return this.surveyService.investorCompleteSurvey(surveyDto, payload);
  }

  @Post('business-owner')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(['jwt']), RolesGuard)
  @Roles(Role.BusinessOwner)
  businessOwnerCompleteSurvey(
    @Body() surveyDto: BusinessOwnerSurveyDto,
    @GetPayload() payload: Payload,
  ): Observable<{
    surveyStatus: SurveyStatus;
  }> {
    return this.surveyService.businessOwnerCompleteSurvey(surveyDto, payload);
  }
}
