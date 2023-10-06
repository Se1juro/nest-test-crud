import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShoppingKartRepository } from './repositories/shoppingKart.repository';
import { ShoppingKartCreateValidator } from './validators/shoppingKart.validator';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { ShoppingKartProductsRepository } from 'src/shopping-kart-products/repositories/shoppingKartProducts.repository';
import { ShoppingKart } from './model/shoppingKart.model';
import { ShoppingKartStatusEnum } from 'src/enums/shoppingKartStatus.enum';

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
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: 'Product not found',
      });

    if (product.quantity < quantity)
      throw new BadRequestException('Units not available', {
        cause: new Error(),
        description: 'Units not available',
      });

    let currentKart = await this.shoppingKartRepository.findOne({
      where: { userId: 1, status: ShoppingKartStatusEnum.PENDING },
    });

    // If not exits a kart pending, create one
    if (!currentKart) {
      const newKart = this.shoppingKartRepository.create({
        status: ShoppingKartStatusEnum.PENDING,
        userId: 1,
        total: 0,
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

    const kartProduct = await this.shoppingKartProductRepository.save({
      ...shoppingKartProduct,
      quantity: newQuantity,
    });

    const total = kartProduct.quantity * product.price;

    currentKart.total = Number(total) + Number(currentKart.total);

    await this.shoppingKartRepository.save(currentKart);

    return await this.getKartWithProduct(currentKart.id);
  }

  async getKartWithProduct(kartId: number) {
    return await this.shoppingKartRepository.getKartWithProductByKartId(kartId);
  }

  async syncShoppingKart(shoppingKartId: number) {
    let total = 0;

    const shoppingKart = await this.shoppingKartRepository.findOne({
      where: { id: shoppingKartId, status: ShoppingKartStatusEnum.PENDING },
    });

    if (!shoppingKart) return false;
    total += shoppingKart.total;

    const products =
      await this.shoppingKartProductRepository.getProducts(shoppingKartId);

    products.forEach((product) => {
      total += product.quantity * product.product.price;
    });

    const updatedKart = this.shoppingKartRepository.create({
      ...shoppingKart,
      total,
    });

    await this.shoppingKartRepository.save(updatedKart);

    return await this.shoppingKartRepository.getKartWithProduct(1);
  }

  async updateKart(kart: ShoppingKart) {
    const kartUpdate = this.shoppingKartRepository.create(kart);

    return await this.shoppingKartRepository.save(kartUpdate);
  }

  async getShoppingKart(userId: number) {
    const kart = await this.shoppingKartRepository.findOne({
      where: { userId, status: ShoppingKartStatusEnum.PENDING },
    });
    if (!kart)
      throw new NotFoundException({
        message: 'Your kart is empty, add products',
      });

    return await this.getKartWithProduct(kart.id);
  }
}
