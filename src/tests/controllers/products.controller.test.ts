import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../product/product.controller';
import { ProductService } from 'src/product/product.service';
import { productsResponse } from '../examples/products';

describe('Product Controller', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService], // Agrega el servicio al módulo de prueba
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should return an array of products', async () => {
    const result = productsResponse;

    const getAllProductsSpy = jest
      .spyOn(productService, 'getAllProducts' as any)
      .mockResolvedValueOnce(result);

    // Llama al método del controlador que deseas probar
    const response = await productController.getAllProducts({
      limit: 10,
      page: 1,
    });

    expect(response).toBe(result);
    expect(getAllProductsSpy).toHaveBeenCalled();
  });
});
