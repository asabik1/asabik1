export interface AchqSubmitPaymentResponse {
  CommandStatus: string;
  Description: string;
  ErrorInformation?: any;
  ExpressVerify: any;
  ResponseData?: any;
  ACHQToken?: any;
  Provider_TransactionID?: string;
  TransAct_ReferenceID: string;
  ResponseCode: string;
}
