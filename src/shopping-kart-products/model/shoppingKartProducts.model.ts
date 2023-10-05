import { Product } from 'src/product/model/product.model';
import { ShoppingKart } from 'src/shopping-kart/model/shoppingKart.model';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('shopping_kart_products_pkey', ['id'], { unique: true })
@Entity({ name: 'shopping_kart_products' })
export class ShoppingKartProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shopping_kart_id' })
  shoppingKartId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(
    () => ShoppingKart,
    (shoppingKarts) => shoppingKarts.shoppingKartProducts,
  )
  @JoinColumn([{ name: 'shopping_kart_id', referencedColumnName: 'id' }])
  shoppingKart: ShoppingKart;

  @ManyToOne(() => Product, (products) => products.shoppingKartProducts)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
