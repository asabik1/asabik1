import { Controller, UseGuards, Body, Post, Ip } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Observable } from 'rxjs';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { GetPayload } from '../../users/decorators/get-payload.decorator';
import { Payload } from '../../users/models/payload-interface';
import { InvestmentService } from '../services/investment.service';

@ApiBearerAuth()
@Controller('investments')
@ApiTags('investments')
@UseGuards(AuthGuard(['jwt']), RolesGuard)
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @Roles(Role.Investor)
  invest(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @GetPayload() payload: Payload,
    @Ip() ip: string,
  ): Observable<void> {
    return this.investmentService.invest(payload, createInvestmentDto, ip);
  }
}
