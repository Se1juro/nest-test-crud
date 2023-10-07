import { Product } from '~/product/model/product.model';
import { ShoppingKart } from '~/shopping-kart/model/shoppingKart.model';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('shopping_kart_products_pkey', ['id'], { unique: true })
@Index('index_kart_product_on_kart_id', ['shoppingKartId'], {})
@Index('index_kart_product_on_product_id', ['productId'], {})
@Entity({ name: 'shopping_kart_products' })
export class ShoppingKartProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shopping_kart_id' })
  shoppingKartId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'quantity' })
  quantity: number;

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
