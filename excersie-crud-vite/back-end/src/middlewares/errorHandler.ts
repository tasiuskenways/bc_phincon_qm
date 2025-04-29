import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ZodError } from "zod";
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error response
  let statusCode = 500;
  let message = "Internal Server Error";
  let details: unknown = null;

  // Handle different error types
  if (err instanceof createHttpError.HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    details = err.errors;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Log the error for debugging
  console.error(err);

  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      details,
      stack:
        process.env.NODE_ENV === "development"
          ? err instanceof Error
            ? err.stack
            : undefined
          : undefined,
    },
  });
};
