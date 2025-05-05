import { NextFunction, Request, Response } from "express";

export const validatePath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validEndpoints = [
    "login",
    "register",
    "products",
    "cart",
    "transaction",
    "history",
  ];
  if (!validEndpoints.includes(req.path.split("/")[1])) {
    res.status(404).json({
      status: "error",
      message: "Endpoint not found",
    });
    return;
  }
  next();
};
