import { ACCOUNT_TYPE, FindUser, User } from './user.model';
import { EntityRepository, Not, Repository } from 'typeorm';
import {
  UpdateUserDTO,
  UserDTO,
} from '@app/http/controllers/users/user.validator';

import { DB_ERROR_CODES } from '@app/internal/db';
import { Injectable } from '@nestjs/common';
import { TRANSACTION_STATUS } from '@app/transactions';

@Injectable()
@EntityRepository(User)
export class UserRepo extends Repository<User> {
  /**
   * creates a new user. throws error on duplicate email (or phone number)
   * @param user_data
   * @param password_hash
   * @returns Promise<User>
   */
  async create_user(user_data: UserDTO) {
    let user = new User();
    user.email_address = user_data.email_address;
    user.first_name = user_data.first_name;
    user.last_name = user_data.last_name;
    user.phone_number = user_data.phone_number;
    user.account_type = ACCOUNT_TYPE.USER;
    try {
      user = await this.save(user);
      return user;
    } catch (err) {
      if (err.code === DB_ERROR_CODES.DUPLICATE) {
        throw new DuplicateUser();
      }
      throw err;
    }
  }

  /**
   * checks is user exists. cretes a user if not found
   * @param phone_number user's phone number
   */
  async get_or_create_user_by_phone_number(phone_number: string) {
    let user = await this.findOne({
      where: { phone_number, account_type: Not(ACCOUNT_TYPE.ADMIN) },
    });

    if (!user) {
      user = new User();
      user.phone_number = phone_number;
      user.account_type = ACCOUNT_TYPE.USER;
      user = await this.save(user);
    }
    return user;
  }

  /**
   * updates user's details. throws exception if user not found.
   * @param user_id
   * @param payload
   * @returns updated user details
   */
  async update_user(user_id: string, payload: UpdateUserDTO) {
    const user = await this.findOne(user_id);

    if (!user) throw new UserNotFound();

    if (payload.first_name) user.first_name = payload.first_name;

    if (payload.last_name) user.last_name = payload.last_name;

    if (payload.email_address) user.email_address = payload.email_address;

    return await this.save(user);
  }

  async find_or_create_user(params: FindUser) {
    let user: User;

    if (params.email_address) {
      user = await this.findOne({
        where: {
          email_address: params.email_address,
          account_type: Not(ACCOUNT_TYPE.ADMIN),
        },
      });
    } else if (params.phone_number) {
      user = await this.findOne({
        where: {
          phone_number: params.phone_number,
          account_type: Not(ACCOUNT_TYPE.ADMIN),
        },
      });
    }

    if (user) return user;

    user = new User();
    user.first_name = params.first_name ?? null;
    user.last_name = params.last_name ?? null;
    user.email_address = params.email_address ?? null;
    user.phone_number = params.phone_number ?? null;
    user.account_type = ACCOUNT_TYPE.USER;

    try {
      return await this.save(user);
    } catch (err) {
      if (err.code === DB_ERROR_CODES.DUPLICATE) {
        throw new DuplicateUser();
      }
      throw err;
    }
  }

  async update_user_balance(user: User) {
    return await this.query(
      `
    BEGIN;

    UPDATE
      users
    SET
      account_balance = (
        SELECT
          sum(nullif(native_amount,0))
        FROM
          transactions
        WHERE
          user_id = '${user.id}'
          AND status = '${TRANSACTION_STATUS.SUCCESSFUL}'
          AND native_amount IS NOT NULL)
      WHERE
        id = '${user.id}';

    COMMIT;
    `,
    );
  }
}

export class DuplicateUser extends Error {
  constructor() {
    super('A user with the given details already exists');
  }
}

export class UserNotFound extends Error {
  constructor() {
    super('A user with the given identifier does not exist');
  }
}
