import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShoppingKartCreateValidator } from './validators/shoppingKart.validator';
import { ShoppingKartService } from './shopping-kart.service';

@Controller('/v1/shopping-kart')
export class ShoppingKartController {
  constructor(private readonly shoppingKartService: ShoppingKartService) {}

  @Post('/add-product/')
  addProductToKart(@Body() shoppingKart: ShoppingKartCreateValidator) {
    return this.shoppingKartService.addProductToKart(shoppingKart);
  }

  @Get()
  getUserKart() {
    // TODO: Implements session to get userID
    return this.shoppingKartService.getShoppingKart(1);
  }
}
