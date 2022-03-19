import { Model } from '@app/internal/model';
import { Point } from 'geojson';
import { ORDER_TYPE, PACKAGE_FRAGILITY } from '@app/orders/';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'users';

@Entity({ name: 'order_requests' })
export class OrderRequest extends Model {
  /**
   * User making the request
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * JSON data of sender of package
   */
  @Column({ type: 'json' })
  sender_details: string;

  /**
   * JSON data of recipient of package
   */
  @Column({ type: 'json' })
  recipient_details: string;

  /**
   * type of order request user wants to make: could be go box or go send
   */
  @Column()
  order_type: ORDER_TYPE;

  /**
   * type of package to be delivered by user
   */
  @Column()
  package_type: string;

  /**
   * package fragility specification
   */
  @Column()
  package_fragility: PACKAGE_FRAGILITY;

  /**
   * minimum package size in Kg
   */
  @Column({ nullable: true, unsigned: true, type: 'decimal' })
  package_minimum_size: number;

  /**
   * maximum package size in Kg
   */
  @Column({ nullable: true, unsigned: true, type: 'decimal' })
  package_maximum_size: number;

  /**
   * pickup location: to be used to search for hoppers
   *  */
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  pickup_point: Point;

  /**
   * pickup location: to be used to search for hoppers
   *  */
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  delivery_point: Point;

  @Column()
  status: ORDER_REQUEST_STATUS;
}

export enum ORDER_REQUEST_STATUS {
  CREATED = 'created',
  ACCEPTED = 'accepted',
  ORDERED = 'ordered',
}
