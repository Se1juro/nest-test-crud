import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'src/constants/auth.constant';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, UserService],
})
export class AuthModule {}
