import { ProductPurchase } from 'src/product-purchase/model/productPurchase.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
@Index('product_pkey', ['id'], { unique: true })
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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  updateDatesWhenCreate() {
    this.createdAt = new Date();
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
