import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Product } from './model/product.model';
import { ProductRepository } from './repositories/product.repository';
import { IParamsSearch } from 'src/interfaces/paramsSearchProducts.interface';
import { ShoppingKart } from 'src/shopping-kart/model/shoppingKart.model';
import { IProductsResponse } from 'src/interfaces/products.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: DeepPartial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);

    return await this.productRepository.save(newProduct);
  }

  async getAllProduct(params: IParamsSearch): Promise<IProductsResponse> {
    const { limit, page } = params;
    const [rows, totalRows] = await this.productRepository.searchProducts(
      page,
      limit,
    );

    return {
      rows,
      totalRows,
      page,
      limit,
      totalPage: Math.ceil(totalRows / limit),
    };
  }

  async updateProduct(product: DeepPartial<Product>) {
    const productUpdated = this.productRepository.create(product);

    return await this.productRepository.save(productUpdated);
  }

  async reduceStock(productId: number, stockToReduce: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException('Product not found', {
        cause: new Error(),
        description: 'Product not found',
      });

    if (product.quantity < 1 || product.quantity - stockToReduce < 0)
      throw new BadRequestException('Product without stock', {
        cause: new Error(),
        description: 'Product without stock',
      });

    const productUpdated = this.productRepository.create({
      ...product,
      quantity: product.quantity - stockToReduce,
    });

    return await this.productRepository.save(productUpdated);
  }

  async checkProductStockWithKart(kart: ShoppingKart) {
    const errors = [];
    if (!kart.shoppingKartProducts.length)
      throw new BadRequestException('Kart is empty', {
        cause: new Error(),
        description: 'Kart is empty',
      });

    for (const product of kart.shoppingKartProducts) {
      const stockProduct = await this.productRepository.findOne({
        where: { id: product.productId },
      });

      if (stockProduct.quantity < product.quantity) {
        errors.push({
          name: stockProduct.name,
          stock: stockProduct.quantity,
          error: 'Without stock',
        });
      }
    }

    return { haveError: errors.length > 0, errors };
  }
}
