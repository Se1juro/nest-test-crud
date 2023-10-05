import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingKartCreateValidator } from './validators/shoppingKart.validator';
import { ShoppingKartService } from './shopping-kart.service';

@Controller('/v1/shopping-kart')
export class ShoppingKartController {
  constructor(private readonly shoppingKart: ShoppingKartService) {}

  @Post('/add-product/')
  addProductToKart(@Body() shoppingKart: ShoppingKartCreateValidator) {
    return this.shoppingKart.addProductToKart(shoppingKart);
  }
}
