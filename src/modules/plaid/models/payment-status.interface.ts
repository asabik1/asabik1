import { TransactionEvent } from '../enum/transaction-event.enum';

export interface PaymentStatus {
  transactReferenceId: string;
  merchantReferenceId: string;
  eventName: TransactionEvent;
  eventDate: Date;
  resultingStatus: string;
  returnCode: string;
  returnExplanation: string;
  verificationStatus: string;
  verificationCode: string;
  verificationDescription: string;
}
