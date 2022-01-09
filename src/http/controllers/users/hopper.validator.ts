import { HOPPER_STATUS } from '@app/users';
import { IsIn } from 'class-validator';

export class UpdateHopperDTO {
  @IsIn(Object.values(HOPPER_STATUS))
  status: HOPPER_STATUS;
}
