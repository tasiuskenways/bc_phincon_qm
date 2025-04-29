import { Router } from "express";
import productsController from "../controllers/products.controller";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.addNewProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;
