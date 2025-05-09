import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import userServices from "../services/user.services";
import examServices from "../services/exam.services";
import Jwt from "jsonwebtoken";
import { env } from "../config/env";
import { decrypt } from "../utils/encrypt.utils";

export const verifyCertificateGenerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = z.object({
      userId: z.string().nonempty(),
      examId: z.string().nonempty(),
    });

    const validateError = schema.safeParse(req.body).error;
    if (validateError) {
      const { userId, examId } = validateError.formErrors.fieldErrors;
      const errorMessage =
        (userId && ` ${userId[0]} for userId`) ||
        (examId && `${examId[0]} for examId`) ||
        "Invalid input";
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }

    const user = await userServices.getUserById(req.body.userId);

    const authHeader = req.headers["authorization"] ?? req.cookies.auth_token;
    console.log(authHeader);

    const decoded: any = Jwt.verify(authHeader, env.JWT_SECRET);
    const decrypted = JSON.parse(await decrypt(decoded.___));

    if (user !== decrypted.id) {
      res.status(401).json({
        status: "error",
        message: "Forbidden",
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    const exam = await examServices.getExamById(req.body.examId);
    if (!exam) {
      res.status(404).json({
        status: "error",
        message: "Exam not found",
      });
      return;
    }

    next();
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
