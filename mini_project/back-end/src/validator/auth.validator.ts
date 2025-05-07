import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { env } from "../config/env";
import Jwt from "jsonwebtoken";

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
    const validateError = loginSchema.safeParse(req.body).error;
    if (validateError) {
      const { email, password } = validateError.formErrors.fieldErrors;
      const errorMessage =
        (email && ` ${email[0]} for email`) ||
        (password && `${password[0]} for password`) ||
        "Invalid input";
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

export const registerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerSchema = z.object({
      username: z.string().min(4),
      password: z.string().min(8),
      email: z.string().email(),
      fullname: z.string().min(4),
      phoneNumber: z.string().min(10),
    });
    const validateError = registerSchema.safeParse(req.body).error;
    if (validateError) {
      const { username, password, email, fullname, phoneNumber } =
        validateError.formErrors.fieldErrors;
      const errorMessage =
        (username && ` ${username[0]} for username`) ||
        (password && `${password[0]} for password`) ||
        (email && `${email[0]} for email`) ||
        (fullname && `${fullname[0]} for fullname`) ||
        (phoneNumber && `${phoneNumber[0]} for phoneNumber`) ||
        "Invalid input";
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }
    next();
  } catch (error) {}
};

export const authTokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"] ?? req.cookies.auth_token;
    console.log(authHeader);

    if (!authHeader) {
      res.status(401).json({
        status: "error",
        message: "Authorization header missing",
      });
      return;
    }

    const decoded = Jwt.verify(authHeader, env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
    });
  }
};
