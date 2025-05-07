import { PrismaClient } from "@prisma/client";
import { generatePdfBuffer } from "../utils/certificate.utils";

const prisma = new PrismaClient();

class CertificateServices {
  async generateCertificate(userId: string, examId: string) {
    try {
      const examDb = await prisma.exams.findUniqueOrThrow({
        where: { id: examId, userId: userId },
        select: {
          id: true,
          data: true,
          userId: true,
          tag: true,
          user: {
            select: {
              username: true,
              fullname: true,
              email: true,
            },
          },
        },
      });

      const user = await prisma.users.findUniqueOrThrow({
        where: { id: userId },
      });

      const exam = {
        ...examDb,
        data: JSON.parse(examDb.data?.toString() || ""),
      };

      const pdf = generatePdfBuffer({
        id: exam.id,
        name: user.fullname,
        score: exam.data.exam.score,
        issuedDate: new Date().toDateString(),
        startDate: new Date(exam.data.exam.startDate).toDateString(),
        endDate: new Date(exam.data.exam.endDate).toDateString(),
        title: exam.data.exam.title,
        code: exam.data.exam.code,
        type: exam.data.exam.type,
      });

      return pdf;
    } catch (error: any) {
      throw new Error("Failed to generate certificate " + error.message);
    }
  }
}

export default new CertificateServices();
