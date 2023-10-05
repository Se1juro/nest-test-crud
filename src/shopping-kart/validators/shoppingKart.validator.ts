import { IsNumber } from 'class-validator';

export class ShoppingKartCreateValidator {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
