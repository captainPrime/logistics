import { Helper } from '@app/internal/utils';
import { Session, SessionStore } from '@app/sessions';
import { UserRepo } from '@app/users';
import { CreateSessionDTO, LocationDTO } from './session.validator';
import { Request } from 'express';
import { Queue } from 'bull';
import { LocationQueueDTO } from '@app/internal/queue';
export declare class SessionController {
    private readonly userRepo;
    private readonly helper;
    private readonly sessions;
    private readonly locationQueue;
    constructor(userRepo: UserRepo, helper: Helper, sessions: SessionStore, locationQueue: Queue<LocationQueueDTO>);
    create_user_session(_body: CreateSessionDTO): Promise<Session>;
    get_user_in_session(req: Request): Promise<import("@app/users").User>;
    update_location(req: Request, dto: LocationDTO): Promise<string>;
}
