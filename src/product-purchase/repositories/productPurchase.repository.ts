import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductPurchase } from '../model/productPurchase.model';

@Injectable()
export class ProductPurchaseRepository extends Repository<ProductPurchase> {
  constructor(private dataSource: DataSource) {
    super(ProductPurchase, dataSource.createEntityManager());
  }
}
