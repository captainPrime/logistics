import { Model } from '@app/internal/model';
import { Hopper } from '@app/hoppers';
import { User } from '@app/users';
import { ORDER_STATUS } from './order.constants';
import { Point } from 'geojson';
export declare class Order extends Model {
    user: User;
    hopper: Hopper;
    status: ORDER_STATUS;
    current_location: Point;
    pickup_time: Date;
    delivery_time: Date;
}
