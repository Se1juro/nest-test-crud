import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateProductValidator } from './validators/createProduct.validator';
import { ProductService } from './product.service';
import { ParamFilterValidator } from './validators/paramFilters.validator';

@Controller('/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() product: CreateProductValidator) {
    return this.productService.createProduct(product);
  }

  @Get()
  getAllProducts(@Query() paramFilters: ParamFilterValidator) {
    const { limit, page } = paramFilters;
    return this.productService.getAllProduct({ limit, page });
  }
}
