import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserCartType } from "../types/CartTypes";

const prisma = new PrismaClient();

const cartController = {
  getAllCarts: async (req: Request, res: Response) => {
    try {
      const carts = await prisma.cart.findMany({
        select: {
          id: true,
          user: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, price: true } },
          totalPrice: true,
        },
      });

      res.json({
        status: "success",
        message: "All carts fetched successfully",
        data: carts,
      });
    } catch (error) {
      console.error("Failed to get all carts:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get all carts",
      });
    }
  },

  getCart: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const cartItems = await prisma.cart.findFirst({
        where: { id: id },
        select: {
          user: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, price: true } },
          quantity: true,
        },
      });

      res.json({
        status: "success",
        message: "Cart items fetched successfully",
        data: cartItems,
      });
    } catch (error) {
      console.error("Failed to get cart items:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get cart items",
      });
    }
  },

  addToCart: async (req: Request, res: Response) => {
    try {
      const { userId, productId, quantity } = req.body;

      const [product, existingCart] = await Promise.all([
        prisma.product.findUnique({ where: { id: productId } }),
        prisma.cart.findFirst({ where: { userId, productId } }),
      ]);

      if (!product) {
        res.status(404).json({ status: "error", message: "Product not found" });
        return;
      }

      let cart;

      if (existingCart) {
        const totalPrice = existingCart.totalPrice + product.price * quantity;
        cart = await prisma.cart.update({
          where: { id: existingCart.id },
          data: { quantity: existingCart.quantity + quantity, totalPrice },
        });
      } else {
        const totalPrice = product.price * quantity;
        cart = await prisma.cart.create({
          data: { userId, productId, quantity, totalPrice },
        });
      }

      res.status(201).json({
        status: "success",
        message: "Product added to cart",
        data: cart,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to add to cart",
      });
    }
  },

  updateCart: async (req: Request, res: Response) => {
    try {
      const { id, quantity } = req.body;

      const cartItem = await prisma.cart.update({
        where: { id },
        data: { quantity },
        select: {
          id: true,
          quantity: true,
          product: { select: { name: true, price: true } },
        },
      });

      res.json({
        status: "success",
        message: "Cart item updated successfully",
        data: cartItem,
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to update cart item",
      });
    }
  },

  removeFromCart: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const cartItem = await prisma.cart.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!cartItem) {
        res.status(404).json({
          status: "error",
          message: "Cart item not found",
        });
        return;
      }

      await prisma.cart.delete({
        where: { id },
      });

      res.json({
        status: "success",
        message: "Product removed from cart",
      });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to remove from cart",
      });
    }
  },

  getUserCart: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      console.log(userId);

      const [totalPrice, cartItems] = await Promise.all([
        prisma.cart.aggregate({
          where: { userId },
          _sum: { totalPrice: true },
        }),
        prisma.cart.findMany({
          where: { userId: userId },
          select: {
            quantity: true,
            productId: true,
            id: true,
            product: {
              select: { id: true, name: true, price: true },
            },
          },
        }),
      ]);

      const cartUser: UserCartType = {
        userId: userId,
        productList: cartItems.map((item) => ({
          cartId: item.id,
          productId: item.productId,
          quantity: item.quantity,
          productName: item.product.name,
          price: item.product.price,
        })),
        totalPrice: totalPrice._sum.totalPrice || 0,
      };

      res.json({
        status: "success",
        message: "Cart items fetched successfully",
        data: cartUser,
      });
    } catch (error) {
      console.error("Failed to get cart items:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to get user cart items",
      });
    }
  },
};

export default cartController;
