import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const createProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productSchema = z.object({
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    category: z.string(),
  });

  const validateError = productSchema.safeParse(req.body).error;
  if (validateError) {
    const { name, price, stock, category } =
      validateError.formErrors.fieldErrors;
    const errorMessage =
      (name && ` ${name[0]} for name`) ||
      (price && `${price[0]} for price`) ||
      (stock && `${stock[0]} for stock`) ||
      (category && `${category[0]} for category`) ||
      "Invalid input";
    res.status(400).json({
      status: "error",
      message: errorMessage,
    });
    return;
  }
  next();
};

export const updateProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productSchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    category: z.string().optional(),
  });

  const validateError = productSchema.safeParse(req.body).error;
  if (validateError) {
    const { name, price, stock, category } =
      validateError.formErrors.fieldErrors;
    const errorMessage =
      (name && ` ${name[0]} for name`) ||
      (price && `${price[0]} for price`) ||
      (stock && `${stock[0]} for stock`) ||
      (category && `${category[0]} for category`) ||
      "Invalid input";
    res.status(400).json({
      status: "error",
      message: errorMessage,
    });
    return;
  }
  next();
};
