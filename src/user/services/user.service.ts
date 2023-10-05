import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { User } from '../model/user.model';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  salt = bcrypt.genSaltSync(10);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: DeepPartial<User>): Promise<User> {
    const { password } = user;
    const passwordHashed = bcrypt.hashSync(password, this.salt);

    const newUser = this.userRepository.create({
      ...user,
      password: passwordHashed,
    });

    return await this.userRepository.save(newUser);
  }
}
