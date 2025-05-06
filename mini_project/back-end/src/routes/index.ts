import { Router } from "express";
import authRoutes from "./auth.routes";
import { authTokenValidator } from "./../validator/auth.validator";
import { decryptMiddleware } from "../middlewares/decrypt.middleware";

const router = Router();

router.use("/auth", decryptMiddleware, authRoutes);

export default router;
