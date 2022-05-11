import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { UPDATE_WALLET_BALANCE } from '@app/internal/events';
import { User } from './user.model';
import { SessionStore } from '@app/sessions';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly user_repo: UserRepo,
    private readonly sessions: SessionStore,
  ) {}

  @OnEvent(UPDATE_WALLET_BALANCE, { async: true })
  async update_wallet_balance(user: User) {
    console.log('updating user balance');
    await this.user_repo.update_user_balance(user);

    await this.sessions.update(user.email_address, await this.user_repo.findOne(user.email_address));
  }
}
