import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { BalanceValidator } from './validators/balance.validator';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthguard';
import {
  chargeBalanceBody,
  chargeBalanceResponse,
} from 'src/documentation/users.documentation';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('/charge-balance')
  @ApiOperation({ summary: 'Cargar saldo en la cuenta del usuario' })
  @ApiBody({
    schema: chargeBalanceBody,
  })
  @ApiResponse(chargeBalanceResponse)
  chargeBalance(@Body() body: BalanceValidator, @Req() req) {
    const { userId } = req.user;
    return this.userService.chargeBalance(body.balance, userId);
  }
}
