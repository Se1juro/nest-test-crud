import { Test, TestingModule } from '@nestjs/testing';
import { IProductsResponse } from '~/interfaces/products.interface';
import { Product } from '~/product/model/product.model';
import { ProductController } from '~/product/product.controller';
import { ProductService } from '~/product/product.service';
import { ProductRepository } from '~/product/repositories/product.repository';
import { CreateProductValidator } from '~/product/validators/createProduct.validator';
import { ParamFilterValidator } from '~/product/validators/paramFilters.validator';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: 'DataSource',
          useValue: {},
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const result = {} as Product;
      jest
        .spyOn(productService, 'createProduct')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await productController.createProduct(new CreateProductValidator()),
      ).toBe(result);
    });
  });

  describe('getAllProducts', () => {
    it('should get all products', async () => {
      const result = {} as IProductsResponse;
      jest
        .spyOn(productService, 'getAllProduct')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await productController.getAllProducts(new ParamFilterValidator()),
      ).toBe(result);
    });
  });
});
