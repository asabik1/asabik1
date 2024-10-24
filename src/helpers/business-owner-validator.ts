import { Injectable } from '@nestjs/common';
import { BusinessOwner } from 'src/modules/business-owner/entities/business-owner.entity';

@Injectable()
export class BusinessOwnerValidator {
  static isComplete(businessOwner: Partial<BusinessOwner>): boolean {
    if (
      !businessOwner?.image?.id ||
      !businessOwner.companyName ||
      !businessOwner.street ||
      !businessOwner.city ||
      !businessOwner.zipCode ||
      !businessOwner?.businessSubsector?.id ||
      !(businessOwner?.investmentRequests?.length > 0) ||
      !businessOwner.description
    ) {
      return false;
    } else {
      return true;
    }
  }
}
