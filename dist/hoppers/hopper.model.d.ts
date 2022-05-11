import { Model } from '@app/internal/model';
import { Point } from 'geojson';
import { User } from '../users/user.model';
export declare class Hopper extends Model {
    status: HOPPER_STATUS;
    location: Point;
    user: User;
}
export declare enum HOPPER_STATUS {
    APPLIED = "applied",
    HOPPING = "hopping",
    IDLE = "idle",
    BOOKED = "booked",
    DECLINED = "declined"
}
export declare enum HOPPER_RATING {
    STAR5 = "star5",
    STAR4 = "star4",
    STAR3 = "star3",
    STAR2 = "star2",
    STAR1 = "star1"
}
