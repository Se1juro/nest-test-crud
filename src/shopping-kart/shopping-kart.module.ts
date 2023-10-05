import { Module } from '@nestjs/common';
import { ShoppingKartController } from './shopping-kart.controller';
import { ShoppingKartService } from './shopping-kart.service';
import { ShoppingKartRepository } from './repositories/shoppingKart.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { ShoppingKartProductsRepository } from 'src/shopping-kart-products/repositories/shoppingKartProducts.repository';

@Module({
  controllers: [ShoppingKartController],
  providers: [
    ShoppingKartService,
    ShoppingKartRepository,
    ProductRepository,
    ShoppingKartProductsRepository,
  ],
})
export class ShoppingKartModule {}
