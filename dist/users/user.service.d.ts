import { UserRepo } from './user.repo';
import { User } from './user.model';
import { SessionStore } from '@app/sessions';
export declare class UserService {
    private readonly user_repo;
    private readonly sessions;
    constructor(user_repo: UserRepo, sessions: SessionStore);
    update_wallet_balance(user: User): Promise<void>;
}
