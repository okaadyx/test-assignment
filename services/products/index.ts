import { AxiosInstance } from 'axios';
import {
  Product,
  ProductsListResponse,
  SearchResponse,
  CategoryProductsResponse,
} from './types';

export class ProductsApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async fetchProducts() {
    const { data } = await this.client.get<ProductsListResponse>('/products');
    return data.products;
  }
  async fetchCategories() {
    const { data } = await this.client.get('/products/categories');
    return data;
  }
  async search(searchQuery: string) {
    const { data } = await this.client.get<SearchResponse>(
      `/products/search?q=${searchQuery}`,
    );
    return data.products;
  }
  async fetchByCategory(slug: string) {
    const { data } = await this.client.get<CategoryProductsResponse>(
      `/products/category/${slug}`,
    );
    return data.products;
  }
  async fetchProductById(id: number) {
    const { data } = await this.client.get<Product>(`/products/${id}`);
    return data;
  }
}
