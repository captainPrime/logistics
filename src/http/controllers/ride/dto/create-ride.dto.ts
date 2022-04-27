import { IsNotEmpty } from 'class-validator';

export class CreateRideDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  category: string;

  createdAt?: string;
}
