import { Purchase } from 'src/purchase/model/purchase.model';
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
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'money' })
  money: number;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
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
}
