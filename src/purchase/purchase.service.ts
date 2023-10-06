import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingKartService } from 'src/shopping-kart/shopping-kart.service';
import { UserService } from 'src/user/user.service';
import { PurchasesRepository } from './repositories/purchases.repository';
import { ProductService } from 'src/product/product.service';
import { ProductPurchaseService } from 'src/product-purchase/product-purchase.service';

@Injectable()
export class PurchaseService {
  constructor(
    private shopKartService: ShoppingKartService,
    private userService: UserService,
    private purchaseRepository: PurchasesRepository,
    private productService: ProductService,
    private productPurchaseService: ProductPurchaseService,
  ) {}

  async shopKart(kartId: number) {
    const kart = await this.shopKartService.syncShoppingKart(kartId);

    if (!kart)
      throw new NotFoundException('Kart not found', {
        cause: new Error(),
        description: 'Kart not found',
      });

    const checkStock =
      await this.productService.checkProductStockWithKart(kart);

    console.log(
      '🚀 ~ file: purchase.service.ts:32 ~ PurchaseService ~ shopKart ~ checkStock:',
      checkStock,
    );

    if (checkStock.haveError)
      throw new BadRequestException({
        message: 'Problems with stock',
        errors: checkStock.errors,
      });

    const user = await this.userService.getUserById(kart.userId);

    if (!user)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });

    if (kart.total > user.money)
      throw new BadRequestException("You don't have enough money", {
        cause: new Error(),
        description: "You don't have enough money",
      });

    const purchase = this.purchaseRepository.create({
      purchaseDate: new Date(),
      total: kart.total,
      userId: user.id,
    });
    // Create purchase
    const purchaseSaved = await this.purchaseRepository.save(purchase);

    await this.productPurchaseService.createProductPurchase(
      purchaseSaved.id,
      kart.shoppingKartProducts,
    );

    // Update money user
    await this.userService.updateUser({
      ...user,
      money: kart.total - user.money,
    });
  }
}
