import { ProductPurchase } from 'src/product-purchase/model/productPurchase.model';
import { User } from 'src/user/model/user.model';
import {
  Column,
  Double,
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
  total: Double;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (users) => users.purchase)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => ProductPurchase,
    (productPurchases) => productPurchases.purchase,
  )
  productPurchase: ProductPurchase[];
}
