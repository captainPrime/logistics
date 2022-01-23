import { Model } from '@app/internal/model';
import { Point } from 'geojson';
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

  @OneToOne(() => User, (u) => u.hopper)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export enum HOPPER_STATUS {
  /**
   * Initiali status of a hopper, for applying to be a hopper
   */
  APPLIED = 'applied',
  /**
   * A hopper who is currently working i.e making a delivery
   */
  HOPPING = 'hopping',
  /**
   * A hopper who is currently not working
   */
  ACTIVE = 'active',
  /**
   * A user whose hopper request was declined
   */
  DECLINED = 'declined',
}
