import { Module } from '@nestjs/common';
import { ProductPurchaseService } from './product-purchase.service';
import { ProductPurchaseRepository } from './repositories/productPurchase.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';

@Module({
  providers: [
    ProductPurchaseService,
    ProductPurchaseRepository,
    ProductRepository,
  ],
})
export class ProductPurchaseModule {}
