import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ShoppingKart } from '../model/shoppingKart.model';

@Injectable()
export class ShoppingKartRepository extends Repository<ShoppingKart> {
  constructor(private dataSource: DataSource) {
    super(ShoppingKart, dataSource.createEntityManager());
  }

  getKartWithProduct(userId: number) {
    return this.createQueryBuilder('sp')
      .select([
        'sp.id',
        'sp.status',
        'sp.total',
        'spp.id',
        'spp.productId',
        'spp.quantity',
        'p.id',
        'p.name',
        'p.price',
      ])
      .innerJoin('sp.shoppingKartProducts', 'spp')
      .innerJoin('spp.product', 'p')
      .where('sp.userId = :userId', { userId })
      .getOne();
  }
}
