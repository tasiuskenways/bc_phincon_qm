import express from "express";
import categoryController from "../controllers/category.controller";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validator/category.validator";

const router = express.Router();

router.post("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", createCategoryValidator, categoryController.createCategory);
router.put("/:id", updateCategoryValidator, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/products/:id", categoryController.getProductsByCategory);

export default router;
