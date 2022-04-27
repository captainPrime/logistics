import { IsDateString } from 'class-validator';

export class FilterRideDto {
  description?: string;

  amount?: number;

  category?: string;

  @IsDateString()
  startDate?: string;

  @IsDateString()
  endDate?: string;
}
