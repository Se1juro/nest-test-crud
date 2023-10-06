import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { BalanceValidator } from './validators/balance.validator';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthguard';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/charge-balance')
  chargeBalance(@Body() body: BalanceValidator, @Req() req) {
    const { userId } = req.user;
    return this.userService.chargeBalance(body.balance, userId);
  }
}
