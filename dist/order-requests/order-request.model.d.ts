import { Model } from '@app/internal/model';
import { Point } from 'geojson';
import { ORDER_TYPE, PACKAGE_FRAGILITY } from '@app/orders/';
import { User } from 'users';
export declare class OrderRequest extends Model {
    user: User;
    sender_details: string;
    recipient_details: string;
    order_type: ORDER_TYPE;
    package_type: string;
    package_fragility: PACKAGE_FRAGILITY;
    package_minimum_size: number;
    package_maximum_size: number;
    pickup_point: Point;
    delivery_point: Point;
    status: ORDER_REQUEST_STATUS;
}
export declare enum ORDER_REQUEST_STATUS {
    CREATED = "created",
    ACCEPTED = "accepted",
    ORDERED = "ordered"
}
