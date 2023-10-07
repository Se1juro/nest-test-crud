import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { ShoppingKartService } from 'src/shopping-kart/shopping-kart.service';
import { UserService } from 'src/user/user.service';
import { PurchasesRepository } from './repositories/purchases.repository';
import { ShoppingKartRepository } from 'src/shopping-kart/repositories/shoppingKart.repository';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { ShoppingKartProductsRepository } from 'src/shopping-kart-products/repositories/shoppingKartProducts.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ProductService } from 'src/product/product.service';
import { ProductPurchaseRepository } from 'src/product-purchase/repositories/productPurchase.repository';
import { ProductPurchaseService } from 'src/product-purchase/product-purchase.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],

  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    ShoppingKartService,
    UserService,
    PurchasesRepository,
    ShoppingKartRepository,
    ProductRepository,
    ShoppingKartProductsRepository,
    UserRepository,
    ProductService,
    ProductPurchaseRepository,
    ProductRepository,
    ProductPurchaseService,
  ],
})
export class PurchaseModule {}
