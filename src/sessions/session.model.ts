import { User } from '@app/users';

export interface Session {
  /**
   * session token
   */
  token: string;

  /**
   * user data
   */
  user: User;
}
