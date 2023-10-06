import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BalanceValidator {
  @IsNumber()
  @Min(1)
  @ApiProperty()
  balance: number;
}
