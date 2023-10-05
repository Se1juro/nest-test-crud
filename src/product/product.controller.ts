import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductValidator } from './validators/createProduct.validator';

@Controller('/v1/products')
export class ProductController {
  @Post()
  createProduct(@Body() product: CreateProductValidator) {
    console.log(
      '🚀 ~ file: product.controller.ts:8 ~ ProductController ~ createProduct ~ product:',
      product,
    );

    return product;
  }
}
