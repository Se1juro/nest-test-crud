import { ProductPurchase } from 'src/product-purchase/model/productPurchase.model';
import { Users } from 'src/user/model/user.model';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('index_purchase_on_user_id', ['userId'], {})
@Index('purchase_pkey', ['id'], { unique: true })
@Entity({ name: 'purchase' })
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Users, (users) => users.purchase)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(
    () => ProductPurchase,
    (productPurchases) => productPurchases.purchase,
  )
  productPurchase: ProductPurchase[];
}
