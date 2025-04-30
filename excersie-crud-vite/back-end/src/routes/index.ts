import { Router } from "express";
import productsRoute from "./products.route";
import usersRoute from "./user.route";
import cartRoute from "./cart.route";

const router = Router();

router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/cart", cartRoute);

export default router;
