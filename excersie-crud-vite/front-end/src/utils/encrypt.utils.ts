import { env } from "@/config/env";
import crypto from "crypto";
import { Buffer } from "buffer";

export const encrypt = (data) => {
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
  }
};
