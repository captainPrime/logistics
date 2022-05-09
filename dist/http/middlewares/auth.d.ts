import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionStore } from '@app/sessions';
export declare class AuthGuard implements CanActivate {
    private sessions;
    constructor(sessions: SessionStore);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
