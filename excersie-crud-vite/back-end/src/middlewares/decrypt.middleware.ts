import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { buffer } from "stream/consumers";

export const decryptMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const iv = Buffer.from(env.CRYPTO_BUFFER_IV, "hex");

    const key = crypto.pbkdf2Sync(
      env.CRYPTO_PASSWORD,
      iv,
      100000,
      32,
      "sha256"
    );
    const decipher = crypto.createDecipheriv(env.CRYPTO_ALGORITHM, key, iv);

    let decrypted = decipher.update(req.body.data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    req.body = JSON.parse(decrypted);
  } catch (error: any) {
    console.error(error);
  } finally {
    next();
  }
};
