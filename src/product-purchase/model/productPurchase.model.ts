import { Product } from '../../product/model/product.model';
import { Purchase } from '../../purchase/model/purchase.model';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product_purchase' })
@Index('index_product_purchase_on_purchase_id', ['purchaseId'], {})
@Index('index_product_purchase_on_product_id', ['productId'], {})
@Index('purchase_product_pkey', ['id'], { unique: true })
export class ProductPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Purchase, (purchases) => purchases.productPurchase)
  @JoinColumn([{ name: 'purchase_id', referencedColumnName: 'id' }])
  purchase: Purchase;

  @ManyToOne(() => Product, (products) => products.productPurchase)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
