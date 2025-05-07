import { Router } from "express";
import authRoutes from "./auth.routes";
import examsRoutes from "./exam.routes";
import { authTokenValidator } from "./../validator/auth.validator";
import { decryptMiddleware } from "../middlewares/decrypt.middleware";

const router = Router();

router.use("/auth", decryptMiddleware, authRoutes);
router.use("/exams", examsRoutes);

export default router;
