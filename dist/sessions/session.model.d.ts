import { User } from '@app/users';
export interface Session {
    token: string;
    user: User;
}
