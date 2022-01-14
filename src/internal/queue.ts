export enum QUEUE {
  LOCATION = 'location',
}

export interface LocationQueueDTO {
  /**
   * User's id.
   */
  user_id: string;
  /**
   * New user location.
   */
  location: number[];
}
