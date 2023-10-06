import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { ShoppingKartService } from 'src/shopping-kart/shopping-kart.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, ShoppingKartService],
})
export class PurchaseModule {}
