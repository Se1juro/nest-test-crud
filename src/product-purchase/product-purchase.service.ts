import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/repositories/product.repository';
import { ShoppingKartProducts } from 'src/shopping-kart-products/model/shoppingKartProducts.model';
import { ProductPurchaseRepository } from './repositories/productPurchase.repository';

@Injectable()
export class ProductPurchaseService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productPurchaseRepository: ProductPurchaseRepository,
  ) {}

  async createProductPurchase(
    purchaseId: number,
    products: ShoppingKartProducts[],
  ) {
    const productsPurchaseSaved = [];
    for (const product of products) {
      const productPurchase = this.productPurchaseRepository.create({
        purchaseId,
        productId: product.productId,
      });

      const saved = await this.productPurchaseRepository.save(productPurchase);
      productsPurchaseSaved.push(saved);
    }
    return productsPurchaseSaved;
  }
}
