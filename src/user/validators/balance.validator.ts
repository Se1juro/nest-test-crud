import { IsNumber, Min } from 'class-validator';

export class BalanceValidator {
  @IsNumber()
  @Min(1)
  balance: number;
}
