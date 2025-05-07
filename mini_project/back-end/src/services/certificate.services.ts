import { PrismaClient } from "@prisma/client";
import { generatePdfBuffer } from "../utils/certificate.utils";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

class CertificateServices {
  async generateCertificate(userId: string, examId: string) {
    try {
      const filename = `certificate-${examId}-${userId}.pdf`;
      const filePath = path.join(
        path.join(__dirname, ".."),
        "generated",
        filename
      );

      if (!fs.existsSync(filePath)) {
        const examDb = await prisma.exams.findUniqueOrThrow({
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

        const exam = {
          ...examDb,
          data: JSON.parse(examDb.data?.toString() || ""),
        };

        const pdf = generatePdfBuffer({
          id: exam.id,
          userId: exam.user.id,
          name: exam.user.fullname,
          score: exam.data.exam.score,
          issuedDate: new Date().toDateString(),
          startDate: new Date(exam.data.exam.startDate).toDateString(),
          endDate: new Date(exam.data.exam.endDate).toDateString(),
          title: exam.data.exam.title,
          code: exam.data.exam.code,
          type: exam.data.exam.type,
        });

        return pdf;
      } else {
        return {
          path: filePath,
          name: filename,
        };
      }
    } catch (error: any) {
      throw new Error("Failed to generate certificate " + error.message);
    }
  }
}

export default new CertificateServices();
