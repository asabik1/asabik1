import { Investor } from '../../investor/entities/investor.entity';
import {
  countInvestedAmountForBusinessOwner,
  countTotalRequiredInvestment,
} from '../../../helpers/investment-requests-counters';
import { Investment } from '../entities/investment.entity';
import { InvestmentGetAdminResponse } from '../model/investment-get-admin-response.interface';

export function toInvestmentGetAdminResponse(
  investment?: Investment,
  investor?: Investor,
): InvestmentGetAdminResponse {
  return {
    businessOwnerId: investment?.investmentRequest?.businessOwner?.id,
    companyName: investment?.investmentRequest?.businessOwner?.companyName,
    businessOwnersName: investment?.investmentRequest?.businessOwner?.ownerName,
    businessSector:
      investment.investmentRequest?.businessOwner?.businessSubsector
        ?.businessSector?.name,
    isActive: investment.investmentRequest?.businessOwner?.isProfileComplete,
    requiredInvestment: countTotalRequiredInvestment([
      investment.investmentRequest,
    ]),
    alreadyInvested: countInvestedAmountForBusinessOwner(
      investor?.investments,
      investment?.investmentRequest?.businessOwner?.id,
    ),
    investmentRequestId: investment?.investmentRequest?.id,
    isLoan: investment?.investmentRequest?.loan !== null,
  };
}
