import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserServices {
  async getUserById(id: string) {
    return await prisma.users.findUnique({ where: { id } });
  }
}

export default new UserServices();
