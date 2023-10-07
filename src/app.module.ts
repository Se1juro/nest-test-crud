import 'dotenv/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './middlewares/logger-middleware.middleware';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ttl: 30000,
      host: 'localhost',
      port: 6379,
    }),
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
  providers: [
    AppService,
    JwtAuthStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
