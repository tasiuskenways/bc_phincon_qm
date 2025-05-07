import express from "express";
import certificateController from "../controllers/certificate.controller";

const router = express.Router();

router.post("/generate", certificateController.generateCertificate);

export default router;
