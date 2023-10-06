import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Purchase } from '../model/purchase.model';

@Injectable()
export class PurchasesRepository extends Repository<Purchase> {
  constructor(private dataSource: DataSource) {
    super(Purchase, dataSource.createEntityManager());
  }
}
