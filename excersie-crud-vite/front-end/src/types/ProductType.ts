export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductState {
  productList: Product[];
  product: Product | null;
  state: "idle" | "loading" | "succeeded" | "failed";
  errorMsg: string | null;
  totalPages: number;
  currentPage: number;
}

export interface ProductResponse {
  products: Product[];
  totalPages: number;
  page: number;
}
