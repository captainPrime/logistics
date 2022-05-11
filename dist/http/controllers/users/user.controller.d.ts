import { Helper } from '@app/internal/utils';
import { SessionStore } from '@app/sessions';
import { User } from '@app/users';
import { UserRepo } from '@app/users';
import { HopperRepo, HOPPER_RATING } from '@app/hoppers';
import { UpdateUserDTO, UserDTO } from './user.validator';
import { Request } from 'express';
import { UpdateHopperDTO } from './hopper.validator';
export declare class UserController {
    private readonly userRepo;
    private readonly helper;
    private readonly sessions;
    private readonly hopperRepo;
    constructor(userRepo: UserRepo, helper: Helper, sessions: SessionStore, hopperRepo: HopperRepo);
    create_user(payload: UserDTO): Promise<User>;
    update_user(user_id: string, payload: UpdateUserDTO): Promise<User>;
    find_user(email_address: string): Promise<User>;
    create_hopper_application(req: Request): Promise<import("@app/hoppers").Hopper>;
    hopper_reapplication(req: Request): Promise<import("@app/hoppers").Hopper>;
    update_application(hopper_id: string, dto: UpdateHopperDTO): Promise<import("@app/hoppers").Hopper>;
    find_hopper(hopper_id: string): Promise<import("@app/hoppers").Hopper>;
    track_hopper(hopper_id: string, dto: UpdateHopperDTO): Promise<import("@app/hoppers").Hopper>;
    rate_hopper(hopper_id: string, dto: HOPPER_RATING): Promise<import("@app/hoppers").Hopper>;
}
