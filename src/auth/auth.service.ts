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
  salt = bcrypt.genSaltSync(10);

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(user: DeepPartial<Users>) {
    const { password } = user;
    const passwordHashed = bcrypt.hashSync(password, this.salt);

    const newUser = this.userRepository.create({
      ...user,
      password: passwordHashed,
    });

    const userRegistered = await this.userRepository.save(newUser);

    return {
      user: userRegistered,
      token: this.generateToken({ ...userRegistered }),
    };
  }

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
