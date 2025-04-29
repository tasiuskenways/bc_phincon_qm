import { Router } from "express";
import productsRoute from "./products.route";

const router = Router();

router.use("/products", productsRoute);

export default router;
