import { ProductPurchase } from 'src/product-purchase/model/productPurchase.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ type: 'datetime' })
  createAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @BeforeInsert()
  updateDatesWhenCreate() {
    this.createAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDateWhenUpdate() {
    this.updatedAt = new Date();
  }

  @OneToMany(
    () => ProductPurchase,
    (productPurchases) => productPurchases.purchase,
  )
  productPurchase: ProductPurchase[];
}
