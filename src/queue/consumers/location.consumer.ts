import { LocationQueueDTO, QUEUE } from '@app/internal/queue';
import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { HopperRepo } from 'users';

@Processor(QUEUE.LOCATION)
export class LocationQueueConsumer {
  constructor(private readonly hoppersRepo: HopperRepo) {}
  @Process()
  async update(job: Job<LocationQueueDTO>) {
    const { user_id, location } = job.data;
    await this.hoppersRepo.query(
      `update hoppers set location=ST_MAKEPOINT(${location[0]},${location[1]}) where user_id='${user_id}'`,
    );
  }
}
