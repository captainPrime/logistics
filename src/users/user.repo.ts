import { UserDTO } from 'src/http/controllers/users/user.validator';
import { DB_ERROR_CODES } from '../internal/db';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.model';

export class DuplicateUser extends Error {
  constructor() {
    super('A user with the given details already exists');
  }
}

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  /**
   * creates a new user. throws error on duplicate email (or phone number)
   * @param user_data
   * @param password_hash
   * @returns Promise<User>
   */
  async create_user(user_data: UserDTO, password_hash: string) {
    let user = new User();
    user.email_address = user_data.email_address;
    user.first_name = user_data.first_name;
    user.last_name = user_data.last_name;
    user.phone_number = user_data.phone_number;
    user.password_hash = password_hash;
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
}
