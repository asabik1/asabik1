/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  ParseIntPipe,
  Ip,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Observable } from 'rxjs';
import { InvestmentRequestService } from '../../investment-request/services/investment-request.service';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { CreateInvestmentRequestDto } from '../dto/investment-request-create.dto';
import { Payload } from '../../users/models/payload-interface';
import { InvestmentRequestGetBusinessOwnerResponse } from '../models/investment-request-get-business-owner-response.interface';
import { UpdateInvestmentRequestDto } from '../dto/investment-request-update.dto';
import { string } from 'mathjs';
import { InvestmentRequestGetDetailedResponse } from '../models/investment-request-get-detailed-response.interface';
import { CreditRatingDataResponse } from '../models/credit-rating-data-response.interface';
import { LoanService } from '../../loan/services/loan.service';
import { GetLoanBusinessOwnerResponse } from '../../loan/models/loan-get-business-owner-response.interface';
import { GetLoanInvestorResponse } from '../../loan/models/loan-get-investor-response.interface';

@ApiBearerAuth()
@Controller('investment-requests')
@ApiTags('investments requests')
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class InvestmentRequestController {
  constructor(
    private readonly investmentRequestService: InvestmentRequestService,
    private readonly loanService: LoanService,
  ) {}

  @Get()
  @Roles(Role.BusinessOwner)
  @ApiOkResponse({
    type: InvestmentRequestGetBusinessOwnerResponse,
    isArray: true,
  })
  getAllinvestmentRequests(
    @GetPayload() payload: Payload,
  ): Observable<InvestmentRequestGetBusinessOwnerResponse[]> {
    return this.investmentRequestService.getAllinvestmentRequests(payload);
  }

  @Get(':investmentRequestId')
  @Roles(Role.BusinessOwner)
  @ApiOkResponse({
    type: InvestmentRequestGetDetailedResponse,
  })
  getInvestmentRequest(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @GetPayload() payload: Payload,
  ): Observable<InvestmentRequestGetDetailedResponse> {
    return this.investmentRequestService.getInvestmentRequestDetails(
      investmentRequestId,
      payload.businessOwnerId,
    );
  }

  @Get(':investmentRequestId/rating-data')
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: CreditRatingDataResponse,
  })
  getCreditRatingDataResponse(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
  ): Observable<CreditRatingDataResponse> {
    return this.investmentRequestService.getCreditRatingDataResponse(
      investmentRequestId,
    );
  }

  @Get(':investmentRequestId/loan')
  @Roles(Role.BusinessOwner)
  @ApiOkResponse({
    type: GetLoanBusinessOwnerResponse,
  })
  getLastLoanForBusinessOwner(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @GetPayload() payload: Payload,
  ): Observable<GetLoanBusinessOwnerResponse> {
    return this.loanService.getLastLoanForBusinessOwner(
      payload.businessOwnerId,
      investmentRequestId,
    );
  }

  @Get(':investmentRequestId/admin/business-owner-loan/:businessOwnerId')
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: GetLoanBusinessOwnerResponse,
  })
  getBusinessOwnersInstallmentsForAdmin(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @Param('businessOwnerId', new ParseIntPipe())
    businessOwnerId: number,
  ): Observable<GetLoanBusinessOwnerResponse> {
    return this.loanService.getLastLoanForBusinessOwner(
      businessOwnerId,
      investmentRequestId,
    );
  }

  @Get(':investmentRequestId/installments')
  @Roles(Role.Investor)
  @ApiOkResponse({
    type: GetLoanInvestorResponse,
  })
  getLastLoanForInvestor(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @GetPayload() payload: Payload,
  ): Observable<GetLoanInvestorResponse> {
    return this.loanService.getLastLoanForInvestor(
      payload.investorId,
      investmentRequestId,
    );
  }

  @Get(':investmentRequestId/admin/investor-loan/:investorId')
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: GetLoanInvestorResponse,
  })
  getInvestorInstallmentsForAdmin(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @Param('investorId', new ParseIntPipe())
    investorId: number,
  ): Observable<GetLoanInvestorResponse> {
    return this.loanService.getLastLoanForInvestor(
      investorId,
      investmentRequestId,
    );
  }

  @Patch(':investmentRequestId')
  @Roles(Role.BusinessOwner)
  updateInvestmentRequest(
    @Body() updateDto: UpdateInvestmentRequestDto,
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @GetPayload() payload: Payload,
  ): Observable<void> {
    return this.investmentRequestService.updateInvestmentRequest(
      updateDto,
      investmentRequestId,
      payload,
    );
  }

  @Patch(':investmentRequestId/accept')
  @Roles(Role.BusinessOwner)
  @ApiCreatedResponse({ type: string })
  acceptLoan(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
    @GetPayload() payload: Payload,
    @Ip() ip: string,
  ): Observable<string> {
    return this.investmentRequestService.acceptLoan(
      investmentRequestId,
      payload,
      ip,
    );
  }

  @Patch(':investmentRequestId/decline')
  @Roles(Role.BusinessOwner)
  @ApiCreatedResponse({ type: string })
  declineLoan(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
  ): Observable<string> {
    return this.investmentRequestService.declineLoan(investmentRequestId);
  }

  @Patch(':investmentRequestId/extend')
  @Roles(Role.BusinessOwner)
  extendRaisingTime(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
  ): Observable<void> {
    return this.investmentRequestService.extendRaisingTime(investmentRequestId);
  }

  @Post()
  @Roles(Role.BusinessOwner)
  @ApiCreatedResponse({ type: string })
  createInvestmentRequest(
    @Body() investmentRequestDto: CreateInvestmentRequestDto,
    @GetPayload() payload: Payload,
  ): Observable<string> {
    return this.investmentRequestService.createInvestmentRequest(
      payload.businessOwnerId,
      investmentRequestDto,
    );
  }

  @Delete(':investmentRequestId')
  @Roles(Role.BusinessOwner)
  deleteInvestmentRequest(
    @Param('investmentRequestId', new ParseIntPipe())
    investmentRequestId: number,
  ): Observable<void> {
    return this.investmentRequestService.deleteInvestmentRequest(
      investmentRequestId,
    );
  }
}
