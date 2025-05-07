import { Request, Response } from "express";
import certificateServices from "../services/certificate.services";

class CertificateControllers {
  async generateCertificate(req: Request, res: Response) {
    try {
      const { examId, userId } = req.body;
      const certificate = await certificateServices.generateCertificate(
        userId,
        examId
      );
      //   res.status(200).json({
      //     status: "success",
      //     message: "Certificate generated successfully",
      //     data: certificate,
      //   });

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
}

export default new CertificateControllers();
