import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Users } from './model/user.model';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  salt = bcrypt.genSaltSync(10);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: DeepPartial<Users>): Promise<Users> {
    const { password } = user;
    const passwordHashed = bcrypt.hashSync(password, this.salt);

    const newUser = this.userRepository.create({
      ...user,
      password: passwordHashed,
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(user: DeepPartial<Users>) {
    const updatedUser = this.userRepository.create(user);

    return await this.userRepository.save(updatedUser);
  }

  async chargeBalance(balance: number) {
    const user = await this.userRepository.findOne({ where: { id: 1 } });
    if (!user)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });

    const newBalance = this.userRepository.create({
      ...user,
      money: user.money + balance,
    });

    return await this.userRepository.save(newBalance);
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
