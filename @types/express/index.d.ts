import { User } from '@app/users';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
