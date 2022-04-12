import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { MINIMUM_AMOUNT } from '@app/transactions';

export class FundWalletDTO {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(MINIMUM_AMOUNT)
  amount: number;
}

export class HopperWithdrawDTO {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(MINIMUM_AMOUNT)
  amount: number;
}


export class AdminWithdrawDTO {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(MINIMUM_AMOUNT)
  amount: number;
}


export class priceAlgorithmDTO {
 
  @IsNotEmpty()
  
  amount: number;
  distance: number;
  traffic: number;
  averageVelocity: number;
  surge: number;
  waitingTime: string;
}
