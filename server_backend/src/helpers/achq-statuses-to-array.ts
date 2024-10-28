import { TransactionEvent } from 'src/modules/plaid/enum/transaction-event.enum';
import { PaymentStatus } from 'src/modules/plaid/models/payment-status.interface';

export function statusesCsvToArray(csv: string): PaymentStatus[] {
  if (csv == 'No Data Found,,,,,,,,,,') return [];
  let rows = csv.split('\n');
  return rows.map((row) => {
    let data = row.split(',');
    return {
      transactReferenceId: data[0],
      merchantReferenceId: data[1],
      eventName: data[2] as TransactionEvent,
      eventDate: new Date(data[3]),
      resultingStatus: data[4],
      returnCode: data[5],
      returnExplanation: data[6],
      verificationStatus: data[7],
      verificationCode: data[8],
      verificationDescription: data[9],
    };
  });
}
