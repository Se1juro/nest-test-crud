import { Product } from 'src/product/model/product.model';

export interface IProductsResponse {
  rows: Product[];
  totalRows: number;
  page: number;
  limit: number;
  totalPage: number;
}
