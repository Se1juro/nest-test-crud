import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Users } from './model/user.model';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(user: DeepPartial<Users>) {
    const updatedUser = this.userRepository.create(user);

    return await this.userRepository.save(updatedUser);
  }

  async chargeBalance(balance: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });

    const newBalance = this.userRepository.create({
      ...user,
      money: Number(user.money) + Number(balance),
    });

    const userSaved = await this.userRepository.save(newBalance);

    delete userSaved.password;

    return userSaved;
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });

    return user;
  }
}
