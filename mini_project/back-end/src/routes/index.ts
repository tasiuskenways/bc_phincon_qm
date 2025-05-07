import { Router } from "express";
import authRoutes from "./auth.routes";
import examsRoutes from "./exam.routes";
import certificateRoutes from "./certificate.routes";
import { decryptMiddleware } from "../middlewares/decrypt.middleware";

const router = Router();

router.use("/auth", decryptMiddleware, authRoutes);
router.use("/exams", examsRoutes);
router.use("/certificate", certificateRoutes);

export default router;
