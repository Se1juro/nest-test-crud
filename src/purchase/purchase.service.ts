import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingKartService } from 'src/shopping-kart/shopping-kart.service';
import { UserService } from 'src/user/user.service';
import { PurchasesRepository } from './repositories/purchases.repository';

@Injectable()
export class PurchaseService {
  constructor(
    private shopKartService: ShoppingKartService,
    private userService: UserService,
    private purchaseRepository: PurchasesRepository,
  ) {}

  async shopKart(kartId: number) {
    const kart = await this.shopKartService.syncShoppingKart(kartId);

    // TODO: Check products stock

    if (!kart)
      throw new NotFoundException('Kart not found', {
        cause: new Error(),
        description: 'Kart not found',
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

    // Update money user
    await this.userService.updateUser({
      ...user,
      money: kart.total - user.money,
    });
  }
}
