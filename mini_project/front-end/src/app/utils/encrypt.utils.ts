"use server";
import crypto from "crypto";
import { getEnv } from "../config/env";

const env = await getEnv();
export const encrypt = async (data: string): Promise<string> => {
  try {
    const iv = Buffer.from(env.CRYPTO_BUFFER_IV, "hex");
    const key = crypto.pbkdf2Sync(
      env.CRYPTO_PASSWORD,
      iv,
      100000,
      32,
      "sha256"
    );
    const cipher = crypto.createCipheriv(env.CRYPTO_ALGORITHM, key, iv);
    let crypted = cipher.update(data, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const decrypt = async (data: any): Promise<string> => {
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

    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error: any) {
    console.error(error);
    return Promise.reject(error);
  }
};
