import { User } from 'src/users/user.model';

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
