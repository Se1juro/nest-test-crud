import { Purchase } from 'src/purchase/model/purchase.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Double,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_pkey', ['id'], { unique: true })
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'money' })
  money: Double;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

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
  @OneToMany(() => Purchase, (purchases) => purchases.user)
  purchase: Purchase[];
}
