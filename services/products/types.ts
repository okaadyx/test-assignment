export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  reviews?: Review[];
  images?: string[];
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
}

export interface Review {
  id: number;
  body: string;
  rating: number;
  userId: number;
  username: string;
  comment?: string;
  reviewerName?: string;
  date?: string;
}

export interface ProductsListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type CategoriesResponse = string[];

export interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
}
