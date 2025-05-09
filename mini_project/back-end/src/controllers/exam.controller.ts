import { Request, Response } from "express";
import examServices from "../services/exam.services";
import redis from "../utils/redis.utils";

class ExamController {
  async findUserCompletedExams(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const redisValue = await redis.get(`exams:${userId}`);
      if (redisValue) {
        res.status(200).json({
          status: "success",
          message: "Exams found successfully",
          data: JSON.parse(redisValue),
        });
        return;
      }

      const exams = await examServices.getUserExams(userId);

      await redis.set(`exams:${userId}`, JSON.stringify(exams), "EX", 60);

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
