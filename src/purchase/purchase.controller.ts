import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('/v1/purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/buy/:kartId')
  shop(@Param('kartId', ParseIntPipe) kartId: number) {
    return this.purchaseService.shopKart(kartId);
  }
}
