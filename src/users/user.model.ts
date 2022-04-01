import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { Model } from '@app/internal/model';
import { numeric } from '@app/internal/db';
import { Hopper } from '../hoppers/hopper.model';
import { Order } from '@app/orders/';

@Entity({ name: 'users' })
export class User extends Model {
  /**
   * user's first name
   */
  @Column({ nullable: true })
  first_name?: string;

  /**
   * user's last name
   */
  @Column({ nullable: true })
  last_name?: string;

  /**
   * user's email address.
   * email address is tranaformed to lower case to avoid case sensitivity search
   */
  @Column({ nullable: true, unique: true })
  email_address?: string;

  /**
   * user's phone number
   * phone number must already be formated in +234 format
   */
  @Column({ unique: true, nullable: true })
  phone_number: string;

  /**
   * type of user
   */
  @Column()
  account_type: ACCOUNT_TYPE;

  /**
   * current account balance
   */
  @Column({
    ...numeric,
    unsigned: true,
    default: 0.0,
  })
  account_balance: number;

  /**
   * transform case insensitive fields to lowercase
   */
  @BeforeInsert()
  transform_fields_to_lowercase() {
    if (this.first_name) this.first_name = this.first_name.toLowerCase();

    if (this.last_name) this.last_name = this.last_name.toLowerCase();

    if (this.email_address)
      this.email_address = this.email_address.toLowerCase();
  }

  /**
   * User relationships
   */
  @OneToOne(() => Hopper, (h) => h.user)
  hopper: Hopper;

  @OneToMany(() => Order, (o) => o.user)
  orders: Order[];
}

export enum ACCOUNT_TYPE {
  USER = 'user',
  HOPPER = 'hopper',
  ADMIN = 'admin',
}

export interface FindUser {
  /**
   * user's id
   */
   user_id?: string;
  /**
   * user's email address
   */
  email_address?: string;

  /**
   * user's phone number
   */
  phone_number?: string;

  /**
   * user's first name
   */
  first_name?: string;

  /**
   * user's last name
   */
  last_name?: string;
}
