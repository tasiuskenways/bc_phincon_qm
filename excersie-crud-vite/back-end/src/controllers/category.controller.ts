import categoryServices from "../services/category.services";
import { Request, Response } from "express";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await categoryServices.getCategories();
      res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const category = await categoryServices.getCategoryById(id);
      res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await categoryServices.createCategory(name);
      res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await categoryServices.deleteCategory(id);
      res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const category = await categoryServices.updateCategory(id, name);
      res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: category,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const products = await categoryServices.getProductsByCategory(id);
      res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new CategoryController();
