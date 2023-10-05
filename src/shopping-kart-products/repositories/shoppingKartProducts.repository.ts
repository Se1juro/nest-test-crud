import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ShoppingKartProducts } from '../model/shoppingKartProducts.model';

@Injectable()
export class ShoppingKartProductsRepository extends Repository<ShoppingKartProducts> {
  constructor(private dataSource: DataSource) {
    super(ShoppingKartProducts, dataSource.createEntityManager());
  }

  getProducts(shoppingKartId: number) {
    return this.createQueryBuilder('skp')
      .select(['skp.id', 'skp.quantity', 'p.id', 'p.name', 'p.price'])
      .innerJoin('skp.product', 'p')
      .where('skp.shoppingKartId = :shoppingKartId', { shoppingKartId })
      .getMany();
  }
}
