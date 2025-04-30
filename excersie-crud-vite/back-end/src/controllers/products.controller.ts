import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const productsController = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
        },
      });
      const totalProducts = await prisma.product.count();
      const totalPages = Math.ceil(totalProducts / limit);

      setTimeout(() => {
        res.json({
          status: "success",
          message: "Products fetched successfully",
          data: { products, page, totalPages },
        });
      }, 300);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch product",
      });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findMany({
        where: {
          OR: [{ name: id }, { id: id }],
        },
        include: {
          category: true,
        },
      });

      if (!product) {
        res.status(404).json({
          status: "error",
          message: "Product not found",
        });
        return;
      }

      res.json({
        status: "success",
        message: "Product fetched successfully",
        data: {
          products: Array.isArray(product) ? product : [product],
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch product",
      });
    }
  },

  addNewProduct: async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        res.status(400).json({
          status: "error",
          message: "Request body is required",
        });
        return;
      }

      const { name, price, category, stock } = req.body;

      if (!name || !price || !category || !stock) {
        res.status(400).json({
          status: "error",
          message: "All fields are required",
        });
        return;
      }
      if (typeof price !== "number" || typeof stock !== "number") {
        res.status(400).json({
          status: "error",
          message: "Price and stock must be numbers",
        });
        return;
      }
      const newProduct = await prisma.product.create({
        data: {
          name,
          price,
          category,
          stock,
        },
      });
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to fetch product",
      });
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        res.status(400).json({
          status: "error",
          message: "Request body is required",
        });
        return;
      }
      const { id } = req.params;
      const { name, price, category, stock } = req.body;

      // Build update data object with only provided fields
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = price;
      if (category !== undefined) updateData.category = category;
      if (stock !== undefined) updateData.stock = stock;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({
          status: "error",
          message: "No fields provided for update",
        });
        return;
      }

      if (
        (updateData.price !== undefined &&
          typeof updateData.price !== "number") ||
        (updateData.stock !== undefined && typeof updateData.stock !== "number")
      ) {
        res.status(400).json({
          status: "error",
          message: "Price or stock must be numbers",
        });
        return;
      }

      const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: updateData,
      });
      res.json({
        status: "success",
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to update product",
      });
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const existingProduct = await prisma.product.findUnique({
        where: { id: id },
      });
      if (!existingProduct) {
        res.status(404).json({
          status: "error",
          message: "Product not found or already deleted",
        });
        return;
      }
      const deletedProduct = await prisma.product.delete({
        where: { id: id },
      });
      res.json({
        status: "success",
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Failed to delete product",
      });
    }
  },
};

export default productsController;
