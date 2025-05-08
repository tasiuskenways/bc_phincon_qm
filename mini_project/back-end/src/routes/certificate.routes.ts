import express from "express";
import certificateController from "../controllers/certificate.controller";

const router = express.Router();

router.post("/generate", certificateController.generateCertificate);
router.get("/validate/:id/:userId", certificateController.verifyCertificate);

export default router;
