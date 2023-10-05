import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductPurchaseModule } from './product-purchase/product-purchase.module';

@Module({
  imports: [ProductModule, UserModule, PurchaseModule, ProductPurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
