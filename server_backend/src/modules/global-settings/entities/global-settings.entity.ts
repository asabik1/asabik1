import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('global_settings')
export class GlobalSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'max_return_term_wo_manual_processing' })
  maxReturnTermWOManualProcessing: number;

  @Column({ name: 'R', type: 'float' })
  r: number;

  @Column({ name: 'M', type: 'float' })
  m: number;

  @Column({ name: 'A', type: 'float' })
  a: number;

  @Column({ name: 'raising_time_limit' })
  raisingTimeLimit: number;

  @Column({ name: 'application_fee' })
  applicationFee: number;

  @Column({ name: 'min_loan' })
  minLoan: number;

  @Column({ name: 'max_loan' })
  maxLoan: number;

  @Column({ name: 'invalid_transaction_penalty' })
  invalidTransactionPenalty: number;

  @Column({ name: 'plaid_token_penalty' })
  plaidTokenPenalty: number;
}
