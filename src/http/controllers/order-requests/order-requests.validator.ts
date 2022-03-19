import {
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ORDER_TYPE, PACKAGE_FRAGILITY } from '@app/orders/';

export class CreateOrderRequestDTO {
  @IsNotEmpty()
  sender_first_name: string;

  @IsNotEmpty()
  sender_last_name: string;

  @IsNotEmpty()
  sender_address: string;

  @IsNotEmpty()
  receiver_first_name: string;

  @IsNotEmpty()
  receiver_last_name: string;

  @IsNotEmpty()
  receiver_address: string;

  @IsNotEmpty()
  @IsIn(Object.values(ORDER_TYPE))
  order_type: ORDER_TYPE;

  @IsNotEmpty()
  package_type: string;

  @IsNotEmpty()
  @IsIn(Object.values(PACKAGE_FRAGILITY))
  package_fragility: PACKAGE_FRAGILITY;

  @IsPositive()
  @IsOptional()
  package_minimum_size?: number;

  @IsPositive()
  @IsNotEmpty()
  package_maximum_size: number;

  @IsNotEmpty()
  @IsLongitude()
  pickup_point_lng: number;

  @IsNotEmpty()
  @IsLatitude()
  pickup_point_lat: number;

  @IsNotEmpty()
  @IsLongitude()
  delivery_point_lng: number;

  @IsNotEmpty()
  @IsLatitude()
  delivery_point_lat: number;
}
