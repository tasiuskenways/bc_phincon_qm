import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

class ExamServices {
  async getUserExams(user: string) {
    const completedExams = await primsa.exams.findMany({
      where: { userId: user },
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
    const completed = completedExams
      .map((exam) => {
        return { ...exam, data: JSON.parse(exam.data?.toString() || "") };
      })
      .filter((exam) => exam.data.status === "completed");
    return completed;
  }

  async getExamById(id: string) {
    return await primsa.exams.findUnique({ where: { id } });
  }
}

export default new ExamServices();
