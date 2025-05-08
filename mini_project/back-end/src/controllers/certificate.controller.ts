import { Request, Response } from "express";
import certificateServices from "../services/certificate.services";

class CertificateControllers {
  /**
   * Generates a PDF certificate for a given user and exam.
   * @param req Express request object
   * @param res Express response object
   * @returns A PDF certificate as a file download
   */
  async generateCertificate(req: Request, res: Response) {
    try {
      const { examId, userId } = req.body;

      const certificate = await certificateServices.generateCertificate(
        userId,
        examId
      );

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${certificate?.name}"`
      );
      res.download(certificate?.path || "", certificate?.name || "", (err) => {
        if (err) {
          console.error("Download error:", err);
          res.status(404).send("File not found.");
        }
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async verifyCertificate(req: Request, res: Response) {
    try {
      const { id, userId } = req.params;
      const isCertificateExist = await certificateServices.isCertificateExist(
        userId,
        id
      );

      res.status(200).json({
        status: "success",
        message: "Certificate found successfully",
        data: {
          isValid: isCertificateExist,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new CertificateControllers();
