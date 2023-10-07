import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ttl: 30000,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
