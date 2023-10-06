import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ShoppingKartCreateValidator } from './validators/shoppingKart.validator';
import { ShoppingKartService } from './shopping-kart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthguard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Shopping Kart')
@UseGuards(JwtAuthGuard)
@Controller('/v1/shopping-kart')
export class ShoppingKartController {
  constructor(private readonly shoppingKartService: ShoppingKartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-product/')
  addProductToKart(
    @Body() shoppingKart: ShoppingKartCreateValidator,
    @Req() req,
  ) {
    const { userId } = req.user;
    return this.shoppingKartService.addProductToKart(shoppingKart, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserKart(@Req() req) {
    const { userId } = req.user;

    return this.shoppingKartService.getShoppingKart(userId);
  }
}
