import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("1d"),
  SECRET_KEY: z.string().min(1),
  CORS_ORIGIN: z.string().default("*"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CRYPTO_PASSWORD: z.string().min(1),
  CRYPTO_ALGORITHM: z.string().default("aes-256-cbc"),
  CRYPTO_BUFFER_IV: z.string().min(1),
});

export const env = envSchema.parse(process.env);
