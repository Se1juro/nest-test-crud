import { Purchase } from '~/purchase/model/purchase.model';
import { ShoppingKart } from '~/shopping-kart/model/shoppingKart.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_pkey', ['id'], { unique: true })
@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'money',
    default: 0.0,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  money: number;

  @Column({ name: 'username', unique: true })
  userName: string;

  @Column({ name: 'password' })
  password: string;

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

  @OneToMany(() => Purchase, (purchases) => purchases.user)
  purchase: Purchase[];

  @OneToMany(() => ShoppingKart, (shoppingKarts) => shoppingKarts.user)
  shoppingKart: ShoppingKart[];
}
