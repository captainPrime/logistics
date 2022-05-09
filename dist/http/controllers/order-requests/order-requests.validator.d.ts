import { ORDER_TYPE, PACKAGE_FRAGILITY } from '@app/orders/';
export declare class CreateOrderRequestDTO {
    sender_first_name: string;
    sender_last_name: string;
    sender_address: string;
    receiver_first_name: string;
    receiver_last_name: string;
    receiver_address: string;
    order_type: ORDER_TYPE;
    package_type: string;
    package_fragility: PACKAGE_FRAGILITY;
    package_minimum_size?: number;
    package_maximum_size: number;
    pickup_point_lng: number;
    pickup_point_lat: number;
    delivery_point_lng: number;
    delivery_point_lat: number;
}
