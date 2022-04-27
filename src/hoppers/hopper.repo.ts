import { DB_ERROR_CODES } from '@app/internal/db';
import { EntityRepository, Repository } from 'typeorm';
import { Hopper, HOPPER_STATUS } from './hopper.model';
import { User } from '../users/user.model';

@EntityRepository(Hopper)
export class HopperRepo extends Repository<Hopper> {
  async create_hopper(user: User, status = HOPPER_STATUS.APPLIED) {
    try {
      const hopper = new Hopper();
      hopper.user = user;
      hopper.status = status;
      return await this.save(hopper);
    } catch (err) {
      if (err.code == DB_ERROR_CODES.DUPLICATE) {
        throw new DuplicateHopper();
      }
    }
  }

  async get_hopper(id: string) {
    const hopper = await this.findOne(id, { relations: ['user'] });
    if (!hopper) throw new HopperNotFound();

    return hopper;
  }

  async get_hopper_by_user(user: User) {
    const hopper = await this.findOne({ user }, { relations: ['user'] });
    if (!hopper) throw new HopperNotFound();

    return hopper;
  }

  async update_hopper_status(hopper: Hopper, status: HOPPER_STATUS) {
    const hopper_status_map = {
      [HOPPER_STATUS.APPLIED]: {
        [HOPPER_STATUS.DECLINED]: true,
        [HOPPER_STATUS.IDLE]: true,
      },
      [HOPPER_STATUS.DECLINED]: {
        [HOPPER_STATUS.APPLIED]: true,
      },
    };

    const valid_move =
      hopper_status_map[hopper.status] &&
      hopper_status_map[hopper.status][status];
    if (!valid_move) throw new InvalidHopperStatusMove();

    hopper.status = status;

    return await this.save(hopper);
  }




  async find_one_avaliable_hopper(hopper: Hopper, status: HOPPER_STATUS) {
    const hopper_status_map = {
      [HOPPER_STATUS.APPLIED]: {
        [HOPPER_STATUS.DECLINED]: true,
        [HOPPER_STATUS.IDLE]: true,
      },
      [HOPPER_STATUS.DECLINED]: {
        [HOPPER_STATUS.APPLIED]: true,
      },
    };
  
    const valid_move =
      hopper_status_map[hopper.status] &&
      hopper_status_map[hopper.status][status];
    if (!valid_move) throw new InvalidHopperStatusMove();
  
    hopper.status = status;
  
    return await this.save(hopper);
  }
  
}








export class DuplicateHopper extends Error {
  constructor() {
    super(
      'You have already applied to be a hopper. you can only reapply and not create a new application.',
    );
  }
}

export class HopperNotFound extends Error {
  constructor() {
    super('The provided hopper identifier does not match any of our records.');
  }
}

export class InvalidHopperStatusMove extends Error {
  constructor() {
    super('Invalid hopper status change.');
  }
}
