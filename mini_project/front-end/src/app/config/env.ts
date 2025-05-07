"use server";
import { loadEnvConfig } from "@next/env";
import { z } from "zod";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const envSchema = z.object({
  API_URL: z.string(),
  CRYPTO_PASSWORD: z.string(),
  CRYPTO_ALGORITHM: z.string(),
  CRYPTO_BUFFER_IV: z.string(),
  JWT_SECRET: z.string(),
});

export async function getEnv() {
  return envSchema.parse(process.env);
}
