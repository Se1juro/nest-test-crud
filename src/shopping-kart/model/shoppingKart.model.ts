import { ShoppingKartStatusEnum } from 'src/enums/shoppingKartStatus.enum';
import { ShoppingKartProducts } from 'src/shopping-kart-products/model/shoppingKartProducts.model';
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

@Index('shopping_kart_pkey', ['id'], { unique: true })
@Entity({ name: 'shopping_kart' })
export class ShoppingKart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'status' })
  status: ShoppingKartStatusEnum;

  @OneToMany(
    () => ShoppingKartProducts,
    (shoppingKartProducts) => shoppingKartProducts.shoppingKart,
  )
  shoppingKartProducts: ShoppingKartProducts[];

  @ManyToOne(() => Users, (users) => users.shoppingKart)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
