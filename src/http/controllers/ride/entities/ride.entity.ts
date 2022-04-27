import { IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';

export class NumericColumnTransformer {
  to(data: number): number {
    return data;
  }
  from(data?: string): number {
    return data !== null && data !== undefined ? Number(data) : null;
  }
}

@Entity()
export class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('numeric', {
    name: 'amount',
    scale: 2,
    transformer: new NumericColumnTransformer(),
  })
  @IsNumber()
  amount: number;

  @Column()
  category: string;

  @Column('date', { name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.rides, { eager: false })
  user: User;

  @Column()
  userId: number;
}
