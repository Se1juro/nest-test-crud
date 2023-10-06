import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateUserValidator } from './validators/user.validator';
import { UserService } from './user.service';
import { BalanceValidator } from './validators/balance.validator';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  signUpUser(@Body() userData: CreateUserValidator) {
    return this.userService.createUser(userData);
  }

  @Patch('/charge-balance')
  chargeBalance(@Body() body: BalanceValidator) {
    return this.userService.chargeBalance(body.balance);
  }
}
