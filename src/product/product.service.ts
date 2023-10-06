import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Product } from './model/product.model';
import { ProductRepository } from './repositories/product.repository';
import { IParamsSearch } from 'src/interfaces/paramsSearchProducts.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: DeepPartial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(product);

    return await this.productRepository.save(newProduct);
  }

  async getAllProduct(params: IParamsSearch) {
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
      throw new BadGatewayException('Product without stock', {
        cause: new Error(),
        description: 'Product without stock',
      });

    const productUpdated = this.productRepository.create({
      ...product,
      quantity: product.quantity - stockToReduce,
    });

    return await this.productRepository.save(productUpdated);
  }
}
