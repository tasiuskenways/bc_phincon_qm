import { PrismaClient, Role, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { env } from "../config/env";

const prisma = new PrismaClient();

class AuthServices {
  async login(username: string): Promise<User> {
    try {
      const user = await prisma.user.findFirstOrThrow({
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
    role: Role
  ): Promise<User> {
    try {
      const id = uuidv7();
      const saltRounds = bcryptjs.genSaltSync(10);
      const hashedPassowrd = await bcryptjs.hash(
        id + env.SECRET_KEY + password,
        saltRounds
      );
      const user = await prisma.user.create({
        data: {
          id: id,
          username: username,
          password: hashedPassowrd,
          role: role,
        },
      });
      return user;
    } catch (error: any) {
      throw new Error("Failed to register user " + error.message);
    }
  }
}

export default new AuthServices();
