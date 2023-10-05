import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Product } from './model/product.model';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async createProduct(product: DeepPartial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);

    return await this.productRepository.save(newProduct);
  }
}
