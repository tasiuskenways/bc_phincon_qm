import express from "express";
import productController from "../controllers/product.controller";
import {
  createProductValidator,
  updateProductValidator,
} from "../validator/product.validator";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", createProductValidator, productController.createProduct);
router.put("/:id", updateProductValidator, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
