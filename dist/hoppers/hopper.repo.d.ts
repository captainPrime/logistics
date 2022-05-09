import { Repository } from 'typeorm';
import { Hopper, HOPPER_STATUS } from './hopper.model';
import { User } from '../users/user.model';
export declare class HopperRepo extends Repository<Hopper> {
    create_hopper(user: User, status?: HOPPER_STATUS): Promise<Hopper>;
    get_hopper(id: string): Promise<Hopper>;
    get_hopper_by_user(user: User): Promise<Hopper>;
    update_hopper_status(hopper: Hopper, status: HOPPER_STATUS): Promise<Hopper>;
}
export declare class DuplicateHopper extends Error {
    constructor();
}
export declare class HopperNotFound extends Error {
    constructor();
}
export declare class InvalidHopperStatusMove extends Error {
    constructor();
}
