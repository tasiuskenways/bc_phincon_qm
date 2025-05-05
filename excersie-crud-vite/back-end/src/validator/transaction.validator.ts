import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const createTransactionValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactionSchema = z.object({
      cashierId: z.string(),
      products: z.array(z.object({ id: z.string(), quantity: z.number() })),
    });

    const validateError = transactionSchema.safeParse(req.body).error;
    if (validateError) {
      const { cashierId, products } = validateError.formErrors.fieldErrors;
      const errorMessage =
        (cashierId && `${cashierId[0]} for cashierId`) ||
        (products && `${products[0]} for products`) ||
        "Invalid input";
      res.status(400).json({
        status: "error",
        message: errorMessage,
      });
      return;
    }
    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
