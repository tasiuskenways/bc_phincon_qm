import express from "express";
import certificateController from "../controllers/certificate.controller";
import { verifyCertificateGenerator } from "../validator/certificate.validator";

const router = express.Router();

router.post(
  "/generate",
  verifyCertificateGenerator,
  certificateController.generateCertificate
);
router.get("/validate/:id/:userId", certificateController.verifyCertificate);

export default router;
