import { Injectable, Logger } from '@nestjs/common';
import { catchError, from, map, mergeMap, Observable } from 'rxjs';
import { statusesCsvToArray } from '../../../helpers/achq-statuses-to-array';
import { dateToAchqString } from '../../../helpers/date-to-achq-string';
import { AchqSubmitPaymentResponse } from '../models/achq-submit-payment-response';
import { PaymentData } from '../models/payment-data.interface';
import { PaymentStatus } from '../models/payment-status.interface';
import { CancelData } from '../models/cancel-data.interface';
import { RefundData } from '../models/refund-data.interface';

@Injectable()
export class AchqService {
  url = 'https://www.speedchex.com/datalinks/transact.aspx';
  logger = new Logger('AchqService');

  submitPayment(
    paymentData: PaymentData,
    processorToken: string,
  ): Observable<AchqSubmitPaymentResponse> {
    const headers = new Headers();
    headers.set('content-type', 'application/x-www-form-urlencoded');

    const data = {
      MerchantID: process.env.MERCHANT_ID,
      Merchant_GateID: process.env.MERCHANT_GATE_ID,
      Merchant_GateKey: process.env.MERCHANT_GATE_KEY,
      Command: 'ECheck.ProcessPayment',
      CommandVersion: '2.0',
      SECCode: paymentData.SECCode,
      Customer_IPAddress: paymentData.ip,
      DeliveryWindow: 'Standard',
      PaymentDirection: paymentData.direction,
      Merchant_ReferenceID: paymentData.id,
      Amount: paymentData.paymentAmount.toString(),
      Billing_CustomerName: paymentData.customerName,
      Billing_Address1: paymentData.address1,
      Billing_City: paymentData.city,
      Billing_State: paymentData.state,
      Billing_Zip: paymentData.zip,
      Billing_Phone: paymentData.phone,
      SendEmailToCustomer: 'No',
      TokenSource: 'Plaid',
      DateScheduled: paymentData.dateScheduled,
      AccountToken: processorToken,
      ResponseType: 'JSON',
    };
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    return from(
      fetch(this.url, {
        method: 'post',
        body: form,
      }),
    ).pipe(
      catchError((err) => {
        this.logger.error(err);
        throw err;
      }),
      mergeMap((data) => data.json()),
    );
  }

  cancelPayment(cancelData: CancelData): Observable<AchqSubmitPaymentResponse> {
    const headers = new Headers();
    headers.set('content-type', 'application/x-www-form-urlencoded');

    const data = {
      Transact_ReferenceID: cancelData.transactReferenceId,
      MerchantID: process.env.MERCHANT_ID,
      Merchant_GateID: process.env.MERCHANT_GATE_ID,
      Merchant_GateKey: process.env.MERCHANT_GATE_KEY,
      Command: 'ECheck.Void',
      CommandVersion: '2.0',
      ResponseType: 'JSON',
    };
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    return from(
      fetch(this.url, {
        method: 'post',
        body: form,
      }),
    ).pipe(
      catchError((err) => {
        this.logger.error(err);
        throw err;
      }),
      mergeMap((data) => data.json()),
    );
  }

  refundPayment(refundData: RefundData): Observable<AchqSubmitPaymentResponse> {
    const headers = new Headers();
    headers.set('content-type', 'application/x-www-form-urlencoded');

    const data = {
      Transact_ReferenceID: refundData.transactReferenceId,
      Merchant_ReferenceID: refundData.id,
      MerchantID: process.env.MERCHANT_ID,
      Merchant_GateID: process.env.MERCHANT_GATE_ID,
      Merchant_GateKey: process.env.MERCHANT_GATE_KEY,
      Command: 'ECheck.Refund',
      CommandVersion: '2.0',
      ResponseType: 'JSON',
    };
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    return from(
      fetch(this.url, {
        method: 'post',
        body: form,
      }),
    ).pipe(
      catchError((err) => {
        this.logger.error(err);
        throw err;
      }),
      mergeMap((data) => data.json()),
    );
  }

  trackPayments(trackingDate: Date = new Date()): Observable<PaymentStatus[]> {
    const headers = new Headers();
    headers.set('content-type', 'application/x-www-form-urlencoded');

    const data = {
      MerchantID: process.env.MERCHANT_ID,
      Merchant_GateID: process.env.MERCHANT_GATE_ID,
      Merchant_GateKey: process.env.MERCHANT_GATE_KEY,
      Command: 'ECheckReports.StatusTrackingQuery',
      CommandVersion: '2.0',
      TrackingDate: dateToAchqString(trackingDate),
    };
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    return from(
      fetch(this.url, {
        method: 'post',
        body: form,
      }),
    ).pipe(
      catchError((err) => {
        this.logger.error(err);
        throw err;
      }),
      mergeMap((data) => data.text()),
      map((csv) => statusesCsvToArray(csv)),
    );
  }
}
