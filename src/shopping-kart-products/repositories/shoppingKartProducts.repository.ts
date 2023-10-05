import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ShoppingKartProducts } from '../model/shoppingKartProducts.model';

@Injectable()
export class ShoppingKartProductsRepository extends Repository<ShoppingKartProducts> {
  constructor(private dataSource: DataSource) {
    super(ShoppingKartProducts, dataSource.createEntityManager());
  }
}
