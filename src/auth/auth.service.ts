import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginValidator } from './validators/login.validator';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { Users } from 'src/user/model/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(user: LoginValidator) {
    const { userName, password } = user;
    const exitsUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (!exitsUser)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User is not registered',
      });

    const checkPassword = await bcrypt.compare(password, exitsUser.password);

    if (!checkPassword)
      throw new ForbiddenException('Password Invalid', {
        cause: new Error(),
        description: 'Password invalid',
      });

    delete exitsUser.password;

    return { user: exitsUser, token: this.generateToken(exitsUser) };
  }

  generateToken(dataUser: DeepPartial<Users>) {
    return this.jwtService.sign({ ...dataUser });
  }
}
