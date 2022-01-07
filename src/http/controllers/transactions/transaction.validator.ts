import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { MINIMUM_AMOUNT } from '@app/transactions';

export class FundWalletDTO {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(MINIMUM_AMOUNT)
  amount: number;
}