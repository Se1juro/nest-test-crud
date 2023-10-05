import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../model/product.model';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  searchProducts(page: number = 1, limit: number = 10) {
    const skip = limit * page - limit;

    return Promise.all([
      this.createQueryBuilder('p')
        .orderBy('p.updatedAt', 'DESC')
        .take(limit)
        .skip(skip)
        .getMany(),
      this.count(),
    ]);
  }
}
