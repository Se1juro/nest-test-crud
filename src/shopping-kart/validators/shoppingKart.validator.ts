import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ShoppingKartCreateValidator {
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;
}
