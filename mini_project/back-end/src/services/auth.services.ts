import { PrismaClient, Users } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { env } from "../config/env";

const prisma = new PrismaClient();

class AuthServices {
  async login(username: string): Promise<Users> {
    try {
      const user = await prisma.users.findFirstOrThrow({
        where: { username: username },
      });

      return user;
    } catch (error: any) {
      throw new Error("Failed to login user " + error.message);
    }
  }
  async register(
    username: string,
    password: string,
    email: string,
    fullname: string,
    phoneNumber: string
  ): Promise<Users> {
    try {
      const id = uuidv7();
      const saltRounds = bcryptjs.genSaltSync(10);
      const hashedPassowrd = await bcryptjs.hash(
        id + env.SECRET_KEY + password,
        saltRounds
      );
      const user = await prisma.users.create({
        data: {
          id: id,
          username: username,
          password: hashedPassowrd,
          email: email,
          fullname: fullname,
          phoneNumber: phoneNumber,
        },
      });
      return user;
    } catch (error: any) {
      throw new Error("Failed to register user " + error.message);
    }
  }
}

export default new AuthServices();
