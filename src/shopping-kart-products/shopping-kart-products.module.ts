import { Module } from '@nestjs/common';
import { ShoppingKartProductsRepository } from './repositories/shoppingKartProducts.repository';

@Module({
  providers: [ShoppingKartProductsRepository],
})
export class ShoppingKartProductsModule {}
