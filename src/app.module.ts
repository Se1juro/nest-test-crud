import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductPurchaseModule } from './product-purchase/product-purchase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DATABASE_CONFIGURATION } from './config/database.configuration';
import { ShoppingKartModule } from './shopping-kart/shopping-kart.module';
import { ShoppingKartProductsModule } from './shopping-kart-products/shopping-kart-products.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthStrategy } from './auth/strategies/auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(DATABASE_CONFIGURATION),
    ProductModule,
    UserModule,
    PurchaseModule,
    ProductPurchaseModule,
    ShoppingKartModule,
    ShoppingKartProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthStrategy],
})
export class AppModule {
  constructor() {}
}
