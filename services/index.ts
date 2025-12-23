import axios, { AxiosInstance } from 'axios';
import { ProductsApi } from './products';
class Api {
  axiosClient: AxiosInstance;
  products: ProductsApi;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'https://dummyjson.com',
    });
    this.products = new ProductsApi(this.axiosClient);
  }
}

export const api = new Api();
