import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { SessionStore } from '@app/sessions';
import { UnauthorizedRequest } from '@app/internal/errors';

/**
 * Auth middleware, authenticates user to ensure
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessions: SessionStore) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const authSession = request.headers.authorization;

    if (!authSession) {
      throw new UnauthorizedRequest('We could not authenticate your request');
    }

    const [scheme, token] = authSession.split(/\s+/);

    if (scheme !== 'Bearer') {
      throw new UnauthorizedRequest(
        `${scheme} is not supported. Please use the Bearer scheme`,
      );
    }
    const session = await this.sessions.get(token);

    if (!session) {
      throw new UnauthorizedRequest(
        'We could not find a session for your request',
      );
    }

    res.locals.session = session;

    return true;
  }
}
