export interface PaymentData {
  id: string;
  ip?: string;
  paymentAmount: number;
  direction: 'FromCustomer' | 'ToCustomer';
  SECCode: 'WEB' | 'PPD' | 'CCD';
  customerName: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  dateScheduled?: string;
}
