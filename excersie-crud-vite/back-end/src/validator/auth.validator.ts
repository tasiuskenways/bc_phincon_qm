import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { env } from "../config/env";
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { json } from "stream/consumers";

export const loginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginSchema = z.object({
      username: z.string().min(4),
      password: z.string(),
    });
    const validateError = loginSchema.safeParse(req.body).error;
    if (validateError) {
      const { username, password } = validateError.formErrors.fieldErrors;
      const errorMessage =
        (username && ` ${username[0]} for username`) ||
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
      role: z.enum(["Admin", "Cashier"]),
    });
    const validateError = registerSchema.safeParse(req.body).error;
    if (validateError) {
      const { username, password, role } = validateError.formErrors.fieldErrors;
      const errorMessage =
        (username && ` ${username[0]} for username`) ||
        (password && `${password[0]} for password`) ||
        (role && `${role[0]} for role`) ||
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
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({
        status: "error",
        message: "Authorization header missing",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        status: "error",
        message: "Token missing",
      });
      return;
    }

    const decoded = Jwt.verify(token, env.JWT_SECRET);
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
