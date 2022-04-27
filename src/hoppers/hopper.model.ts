import { Model } from '@app/internal/model';
import { Point } from 'geojson';
// import { Order } from '@app/orders/';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.model';

@Entity({ name: 'hoppers' })
export class Hopper extends Model {
  /**
   * Hopper's status
   */
  @Column()
  status: HOPPER_STATUS;

  /**
   * Hopper's current location... to be updated frequently
   */
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    nullable: true,
    srid: 4326,
  })
  location: Point;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * Relationships
   */
  // @OneToMany(() => Order)
  // orders: Order[];
}

export enum HOPPER_STATUS {
  /**
   * Initial status of a hopper, for applying to be a hopper
   */
  APPLIED = 'applied',
  /**
   * A hopper who is currently working i.e making a delivery
   */
  HOPPING = 'hopping',
  /**
   * A hopper who is currently not working
   */
  IDLE = 'idle',
  /**
   *  A hopper who has been booked but not yet working (e.g on the way to the the pickup location);
   */
  BOOKED = 'booked',
  /**
   * A user whose hopper request was declined
   */
  DECLINED = 'declined',
}


export enum HOPPER_RATING {
  /**
   * 5 star hopper rating
   */
  STAR5 = 'star5',
  /**
   * 4 star hopper rating
   */
  STAR4 = 'star4',
  /**
   * 3 star hopper rating
   */
  STAR3 = 'star3',
  /**
   *  2 star hopper rating
   **/
  STAR2 = 'star2',
  /**
   * 1 star hopper rating
   */
  STAR1 = 'star1',
}
