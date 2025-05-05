import { Request, Response } from "express";
import productServices from "../services/product.services";
import categoryServices from "../services/category.services";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const orderby = (req.query.orderby || "id") as string;
      const ordertype = (req.query.ordertype || "asc") as string;
      const products = await productServices.getProducts(
        page,
        limit,
        orderby,
        ordertype
      );

      res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: {
          page,
          limit,
          total: products.length,
          products,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const product = await productServices.getProductById(id);
      res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, stock, category } = req.body;
      const categoryData = await categoryServices.getCategoriesByName(category);
      const product = await productServices.createProduct(
        name,
        price,
        stock,
        categoryData.id
      );
      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: product,
      });
    } catch (error: any) {
      console.error(error);
      if (error.message === "Invalid category name") {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await productServices.deleteProduct(id);
      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name, price, stock, category } = req.body;
      const categoryData = await categoryServices.getCategoriesByName(category);
      const product = await productServices.updateProduct(
        id,
        name,
        price,
        stock,
        categoryData.id
      );
      res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: product,
      });
    } catch (error: any) {
      console.error(error);
      if (error.message === "Invalid category name") {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new ProductController();
