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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(DATABASE_CONFIGURATION),
    ProductModule,
    UserModule,
    PurchaseModule,
    ProductPurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
