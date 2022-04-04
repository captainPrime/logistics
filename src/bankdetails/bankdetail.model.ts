import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Model } from '../internal/model';
import { User } from '@app/users';
import { CURRENCY } from '.';
// import { numeric } from '@app/internal/db';

@Entity({ name: 'bankdetails' })
export class Bankdetail extends Model {
  /**
   * user adding the bank details
   */
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;


  /**
   * bank account number
   */
  @Column({ unique: true, select: false })
  account_number: string;

  /**
   * bank account number displayed or exposed
   */
  @Column({ unique: true, select: false })
  account_number_display: string;

  /**
   * account name
   */
  @Column({ unique: true, select: false })
  account_name: string;
  /**
   * bank name
   */
  @Column({ unique: true, select: false })
  bank_name: string;
  /**
   * bank identity code 
   */

  @Column({ unique: true, select: false })
  bank_code: string;
  /**
   * bank account id
   */
  @Column({ unique: true, select: false })
  bank_id: string;

  /**
   * raw data from bank provider
   */
  @Column({ type: 'json', nullable: true })
  raw?: JSON | string;

  /**
   * bank currency
   */
  @Column({ default: CURRENCY.NAIRA })
  currency?: CURRENCY;
}

export interface BankdetailDTO {
  /**
   * user making the transaction
   */
  user: User;
/**
   * bank account number
   */
   account_number: string;
   /**
   * bank account number displayed or exposed
   */
   account_number_display: string;
  /**
   * account name
   */
   account_name: string;
  /**
   * bank name
   */
   bank_name: string;
   /**
   * bank identity code 
   */
   bank_code: string;
  /**
   * bank account id
   */
   bank_id: string;



  /**
   * raw data from bank provider
   */
  raw?: JSON  | string;
 /**
   * bank currency
  */
  currency?: CURRENCY;
}


export class BankDetailsNotFound extends Error {
  constructor() {
    super("Whoops! Bank details not found");
  }
}