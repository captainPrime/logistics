import { Model } from '@app/internal/model';
import { Hopper } from '@app/hoppers';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@app/users';
import { ORDER_STATUS } from './order.constants';
import { Point } from 'geojson';

@Entity({ name: 'orders' })
export class Order extends Model {
  /**
   * User making the order request
   */
  @ManyToOne(() => User, (u) => u.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * Hopper who has decided to handle the order
   */
  @ManyToOne(() => Hopper)
  @JoinColumn({ name: 'hopper_id' })
  hopper: Hopper;

  /**
   * status of the order
   */
  @Column()
  status: ORDER_STATUS;

  /**
   * current location of order for tracking purposes
   *  */
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  current_location: Point;

  /**
   * delivery time
   */
  @Column({ nullable: true })
  pickup_time: Date;

  /**
   *  time hopper delivered the package
   */
  @Column({ nullable: true })
  delivery_time: Date;
}
