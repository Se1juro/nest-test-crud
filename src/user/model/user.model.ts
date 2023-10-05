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
@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'money', default: 0 })
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
}
