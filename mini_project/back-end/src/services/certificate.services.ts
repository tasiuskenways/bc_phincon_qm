import { PrismaClient } from "@prisma/client";
import { generatePdfBuffer } from "../utils/certificate.utils";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

class CertificateServices {
  filename = (examId: string, userId: string) => {
    return `certificate-${examId}-${userId}.pdf`;
  };

  filePath = (examId: string, userId: string) => {
    return path.join(
      path.join(__dirname, ".."),
      "generated",
      this.filename(examId, userId)
    );
  };

  /**
   * Determines whether a certificate file exists for a specific user and exam.
   *
   * @param userId - The ID of the user.
   * @param examId - The ID of the exam.
   * @returns A promise that resolves to true if the certificate file exists, otherwise false.
   */

  async isCertificateExist(userId: string, examId: string): Promise<boolean> {
    const filePath = this.filePath(examId, userId);
    return fs.promises
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Generates a certificate PDF for a specific user and exam.
   *
   * If a certificate already exists, it returns the path and name of the existing certificate.
   * Otherwise, it fetches exam details from the database, generates a PDF, and returns the PDF details.
   *
   * @param userId - The ID of the user for whom the certificate is being generated.
   * @param examId - The ID of the exam for which the certificate is being generated.
   * @returns A promise that resolves with the path and name of the generated certificate PDF.
   * @throws An error if the certificate generation process fails.
   */

  async generateCertificate(userId: string, examId: string) {
    try {
      if (await this.isCertificateExist(userId, examId)) {
        return {
          path: this.filePath(examId, userId),
          name: this.filename(examId, userId),
        };
      }

      const examDb = await prisma.exams.findUnique({
        where: { id: examId, userId: userId },
        select: {
          id: true,
          data: true,
          userId: true,
          tag: true,
          user: {
            select: {
              id: true,
              username: true,
              fullname: true,
              email: true,
            },
          },
        },
      });

      if (!examDb) {
        throw new Error("Exam or user not found");
      }

      const examData = JSON.parse(examDb.data?.toString() || "");
      const pdf = await generatePdfBuffer({
        id: examDb.id,
        userId: examDb.user.id,
        name: examDb.user.fullname,
        score: examData.exam.score,
        issuedDate: new Date().toDateString(),
        startDate: new Date(examData.exam.startDate).toDateString(),
        endDate: new Date(examData.exam.endDate).toDateString(),
        title: examData.exam.title,
        code: examData.exam.code,
        type: examData.exam.type,
      });

      return pdf;
    } catch (error: unknown) {
      console.error(error);

      throw new Error("Failed to generate certificate");
    }
  }
}

export default new CertificateServices();
