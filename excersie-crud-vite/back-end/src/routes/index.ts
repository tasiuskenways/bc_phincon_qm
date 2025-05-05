import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes";
import { authTokenValidator } from "./../validator/auth.validator";
import transactionRoutes from "./transaction.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", authTokenValidator, productRoutes);
router.use("/category", authTokenValidator, categoryRoutes);
router.use("/transaction", authTokenValidator, transactionRoutes);

export default router;
