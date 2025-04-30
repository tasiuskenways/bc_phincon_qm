import { Product } from "@prisma/client";

export interface UserCartType {
  userId: string;
  productList: {
    cartId: string;
    productId: string;
    quantity: number;
    productName: string;
    price: number;
  }[];
  totalPrice: number;
}
