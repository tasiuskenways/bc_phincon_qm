import { Product, ProductResponse } from "../types/ProductType";
import { ResponseType } from "../types/ResponseType.ts";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const fetchProducts = async (
  page: number = 1,
  limit: number = 5,
  sortField: string = "",
  sortDirection: string = "asc"
): Promise<ResponseType<ProductResponse>> => {
  let url = `${API_URL}?page=${page}&limit=${limit}`;

  if (sortField) {
    url += `&sortBy=${sortField}&sortDir=${sortDirection}`;
  }

  console.log("url", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data as ResponseType<ProductResponse>;
};

export const fetchProductById = async (
  id: string
): Promise<ResponseType<ProductResponse>> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return (await response.json()) as ResponseType<ProductResponse>;
};

export const createProduct = async (
  product: Product
): Promise<ResponseType<Product>> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return await response.json();
};

export const updateProduct = async (
  product: Product,
  id: number
): Promise<ResponseType<Product>> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};
