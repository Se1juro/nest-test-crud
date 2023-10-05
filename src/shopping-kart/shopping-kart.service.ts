import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingKartRepository } from './repositories/shoppingKart.repository';
import { ShoppingKartCreateValidator } from './validators/shoppingKart.validator';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { ShoppingKartProductsRepository } from 'src/shopping-kart-products/repositories/shoppingKartProducts.repository';

@Injectable()
export class ShoppingKartService {
  constructor(
    private readonly shoppingKartRepository: ShoppingKartRepository,
    private readonly productRepository: ProductRepository,
    private readonly shoppingKartProductRepository: ShoppingKartProductsRepository,
  ) {}

  async addProductToKart(body: ShoppingKartCreateValidator) {
    const { productId, quantity } = body;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });

    if (product.quantity < quantity)
      throw new BadRequestException('Units not available', {
        cause: new Error(),
        description: 'Units not available',
      });

    let currentKart = await this.shoppingKartRepository.findOne({
      where: { userId: 1, status: 0 },
    });

    // If not exits a kart pending, create one
    if (!currentKart) {
      const newKart = this.shoppingKartRepository.create({
        status: 0,
        userId: 1,
      });
      currentKart = await this.shoppingKartRepository.save(newKart);
    }

    let shoppingKartProduct = await this.shoppingKartProductRepository.findOne({
      where: {
        shoppingKartId: currentKart.id,
        productId,
      },
    });

    let newQuantity = 0;

    if (shoppingKartProduct)
      newQuantity = shoppingKartProduct.quantity + quantity;

    if (newQuantity > product.quantity)
      throw new BadRequestException('Units not available', {
        cause: new Error(),
        description: 'Units not available',
      });

    if (!shoppingKartProduct) {
      newQuantity = quantity;
      shoppingKartProduct = this.shoppingKartProductRepository.create({
        productId,
        quantity,
        shoppingKartId: currentKart.id,
      });
    }

    await this.shoppingKartProductRepository.save({
      ...shoppingKartProduct,
      quantity: newQuantity,
    });

    return await this.syncShoppingKart(currentKart.id);
  }

  async syncShoppingKart(shoppingKartId: number) {
    let total = 0;

    const shoppingKart = await this.shoppingKartRepository.findOne({
      where: { id: shoppingKartId },
    });

    if (!shoppingKart) return false;
    total += shoppingKart.total;

    const products =
      await this.shoppingKartProductRepository.getProducts(shoppingKartId);

    products.forEach(
      (product) => (total += product.quantity * product.product.price),
    );

    const updatedKart = this.shoppingKartRepository.create({
      ...shoppingKart,
      total,
    });

    await this.shoppingKartRepository.save(updatedKart);

    return await this.shoppingKartRepository.getKartWithProduct(1);
  }
}
