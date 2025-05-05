import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const createCategoryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categorySchema = z.object({ name: z.string() });
  const validateError = categorySchema.safeParse(req.body).error;
  if (validateError) {
    const { name } = validateError.formErrors.fieldErrors;
    const errorMessage = (name && ` ${name[0]} for name`) || "Invalid input";
    res.status(400).json({
      status: "error",
      message: errorMessage,
    });
    return;
  }
  next();
};

export const updateCategoryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categorySchema = z.object({ name: z.string().optional() });
  const validateError = categorySchema.safeParse(req.body).error;
  if (validateError) {
    const { name } = validateError.formErrors.fieldErrors;
    const errorMessage = (name && ` ${name[0]} for name`) || "Invalid input";
    res.status(400).json({
      status: "error",
      message: errorMessage,
    });
    return;
  }
  next();
};
