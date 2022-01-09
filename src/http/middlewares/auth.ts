import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { SessionStore } from '@app/sessions';
import { UnauthorizedRequest } from '@app/internal/errors';
import { User, ACCOUNT_TYPE } from '@app/users';
import { Request } from 'express';

/**
 * Auth middleware, authenticates user
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessions: SessionStore) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
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
    /**
     * res.locals.session would contain the user in session
     */
    request.user = JSON.parse(session as string) as User;

    return true;
  }
}

/**
 * Admin middleware, for authenticating admins
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    if (req.user?.account_type !== ACCOUNT_TYPE.ADMIN) {
      throw new ForbiddenException(
        'You do not have authorized access to this resource',
      );
    }
    return true;
  }
}
