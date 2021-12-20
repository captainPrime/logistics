import { BeforeInsert, Column, Entity } from 'typeorm';
import { Model } from '../internal/model';

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
  @Column({ nullable: true })
  email_address?: string;

  /**
   * user's phone number
   * phone number must already be formated in +234 format
   */
  @Column({ unique: true })
  phone_number: string;

  /**
   * user's password hash
   */
  @Column()
  account_type: ACCOUNT_TYPE;

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
}

export enum ACCOUNT_TYPE {
  USER = 'user',
  HOPPER = 'hopper',
  ADMIN = 'admin',
}
