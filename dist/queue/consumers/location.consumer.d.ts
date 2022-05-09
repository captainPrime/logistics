import { LocationQueueDTO } from '@app/internal/queue';
import { Job } from 'bull';
import { HopperRepo } from '@app/hoppers';
export declare class LocationQueueConsumer {
    private readonly hoppersRepo;
    constructor(hoppersRepo: HopperRepo);
    update(job: Job<LocationQueueDTO>): Promise<void>;
}
