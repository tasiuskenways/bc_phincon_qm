import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserCartType } from "../types/CartTypes";

const prisma = new PrismaClient();

const cartController = {
  getAllCarts: async (req: Request, res: Response) => {
    try {
      const carts = await prisma.cart.findMany({
        include: {
          user: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, price: true } },
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
      const { userId } = req.params;

      const cartItems = await prisma.cart.findMany({
        where: { userId },
        include: {
          user: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, price: true } },
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

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        res.status(404).json({ status: "error", message: "Product not found" });
        return;
      }

      const exsistCart = await prisma.cart.findFirst({
        where: { userId, productId },
      });

      let cart;

      if (exsistCart) {
        const totalPrice = exsistCart.totalPrice + product.price * quantity;
        cart = await prisma.cart.update({
          where: { id: exsistCart.id },
          data: { quantity: exsistCart.quantity + quantity, totalPrice },
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

      const cartItem = await prisma.cart.delete({
        where: { id },
      });

      res.json({
        status: "success",
        message: "Product removed from cart",
        data: cartItem,
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

      const cartItems = await prisma.cart.findMany({
        where: { userId },
        include: {
          user: { select: { id: true, name: true } },
          product: { select: { id: true, name: true, price: true } },
        },
      });

      const cartUser: UserCartType = {
        userId: userId,
        productList: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          productName: item.product.name,
          price: item.product.price,
        })),
        totalPrice: cartItems
          .flatMap((item) => item.totalPrice)
          .reduce((a, b) => a + b, 0),
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
