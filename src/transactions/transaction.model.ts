import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  TRANSACTION_INTENTS,
  TRANSACTION_PROVIDERS,
  TRANSACTION_STATUS,
  TRANSACTION_TYPES,
} from './transaction.constant';

import { Model } from '../internal/model';
import { User } from '@app/users';
import { CURRENCY } from '.';

@Entity({ name: 'transactions' })
export class Transaction extends Model {
  /**
   * user making the transaction
   */
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  /**
   * Reason for transaction
   */
  @Column()
  intent: TRANSACTION_INTENTS;

  /**
   * type of transaction user is making
   */
  @Column()
  transaction_type: TRANSACTION_TYPES;

  /**
   * transaction amount
   */
  @Column({ type: 'numeric', precision: 12, scale: 2, unsigned: true })
  amount: number;

  /**
   * stats of transaction
   */
  @Column()
  status: TRANSACTION_STATUS;

  /**
   * transaction provider
   */
  @Column()
  provider: TRANSACTION_PROVIDERS;

  /**
   * transaction provider reference
   */
  @Column({ unique: true, select: false })
  transaction_reference: string;

  /**
   * raw data from transaction provider
   */
  @Column({ type: 'json', nullable: true })
  raw?: JSON | string;

  /**
   * transaction currency
   */
  @Column({ default: CURRENCY.NAIRA })
  currency?: CURRENCY;
}

export interface TransactionDTO {
  /**
   * user making the transaction
   */
  user: User;
  /**
   * transaction intent
   */
  intent: TRANSACTION_INTENTS;
  /**
   * type of transaction
   */
  transaction_type: TRANSACTION_TYPES;
  /**
   * amount to be transacted
   */
  amount: number;
  /**
   * transaction provider
   */
  provider: TRANSACTION_PROVIDERS;
  /**
   * tranacation provider reference for referencing transaction
   */
  transaction_reference: string;
  /**
   * raw data from provider
   */
  raw?: JSON;
  /**
   * transaction currency
   */
  currency?: CURRENCY;
}
