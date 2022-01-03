import { User } from 'src/users/';

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
