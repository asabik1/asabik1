export enum TransactionEvent {
  Created = 'Created',
  Cancelled = 'Cancelled',
  Submitted = 'Submitted',
  Cleared = 'Cleared',
  Rejected = 'Rejected',
  ReturnedNSF = 'Returned-NSF ',
  ReturnedOther = 'Returned-Other ',
  ChargedBack = 'Charged Back',
  HeldByMerchant = 'Held by Merchant ',
  HeldByProcessor = 'Held by Processor',
}
