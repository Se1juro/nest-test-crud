import { IsNumber, Min } from 'class-validator';

export class ShoppingKartCreateValidator {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
