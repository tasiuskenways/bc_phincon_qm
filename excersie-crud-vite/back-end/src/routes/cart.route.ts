import { Router } from "express";
import cartController from "../controllers/cart.controller";

const router = Router();

router.get("/", cartController.getAllCarts);
router.get("/:id", cartController.getCart);
router.get("/user/:id", cartController.getUserCart);
router.post("/", cartController.addToCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.removeFromCart);

export default router;
