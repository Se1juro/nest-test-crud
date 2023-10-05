import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductValidator } from './validators/createProduct.validator';

@Controller('/v1/products')
export class ProductController {
  constructor() {}

  @Post()
  createProduct(@Body() product: CreateProductValidator) {
    return product;
  }
}
