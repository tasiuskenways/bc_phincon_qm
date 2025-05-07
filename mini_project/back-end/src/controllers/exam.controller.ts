import { Request, Response } from "express";
import examServices from "../services/exam.services";

class ExamController {
  async findUserCompletedExams(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const exams = await examServices.getUserExams(userId);

      res.status(200).json({
        status: "success",
        message: "Exams found successfully",
        data: exams,
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

export default new ExamController();
