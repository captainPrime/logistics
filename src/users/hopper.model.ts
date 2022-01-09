import { Model } from '@app/internal/model';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.model';

@Entity({ name: 'hoppers' })
export class Hopper extends Model {
  @Column()
  status: HOPPER_STATUS;

  @OneToOne(() => User, (u) => u.hopper)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export enum HOPPER_STATUS {
  APPLIED = 'applied',
  APPROVED = 'approved',
  DECLINED = 'declined',
}
