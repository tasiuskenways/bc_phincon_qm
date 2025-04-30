import { Product } from "@prisma/client";

export interface UserCartType {
  userId: string;
  productList: {
    productId: string;
    quantity: number;
    productName: string;
    price: number;
  }[];
  totalPrice: number;
}
