import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthguard';

@ApiBearerAuth()
@ApiTags('Purchases')
@UseGuards(JwtAuthGuard)
@Controller('/v1/purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/buy/:kartId')
  shop(@Param('kartId', ParseIntPipe) kartId: number) {
    return this.purchaseService.shopKart(kartId);
  }
}
