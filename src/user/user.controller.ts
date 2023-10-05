import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserValidator } from './validators/user.validator';
import { UserService } from './services/user.service';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  signUpUser(@Body() userData: CreateUserValidator) {
    return this.userService.createUser(userData);
  }
}
