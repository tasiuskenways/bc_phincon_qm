import { PrismaClient } from "@prisma/client";
import { v7 as uuidv7 } from "uuid";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.tryoutSections.deleteMany();
  await prisma.courses.deleteMany();
  await prisma.exams.deleteMany();
  await prisma.users.deleteMany();

  await prisma.users.createMany({
    data: Array.from({ length: 10 }, (_, i) => {
      const id = uuidv7() as string;
      const password = bcryptjs.hashSync(
        `${id}${process.env.SECRET_KEY || ""}user${i + 1}`,
        10
      );
      return {
        id,
        username: `user${i + 1}`,
        password,
        active: true,
        fullname: `User ${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        phoneNumber: `0812345678${i + 1}`,
      };
    }),
  });

  const adminId = uuidv7();
  const adminPassword = bcryptjs.hashSync(
    `${adminId}${process.env.SECRET_KEY || ""}admin`,
    10
  );
  await prisma.users.create({
    data: {
      id: adminId,
      username: "admin",
      password: adminPassword,
      active: true,
      fullname: "Admin User",
      email: "admin@admin.com",
      phoneNumber: "1234567890",
    },
  });

  const examData = await Promise.all(
    Array.from({ length: 1000 }, async (_, i) => {
      const users = await prisma.users.findMany({
        skip: i % 10,
        take: 1,
      });

      const userId = users[0]?.id;

      return {
        id: uuidv7() as string,
        userId,
        active: true,
      };
    })
  );

  await prisma.exams.createMany({
    data: examData,
  });

  await prisma.courses.createMany({
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: uuidv7() as string,
      code: `course-${i + 1}`,
      title: `Course ${i + 1}`,
      order: i + 1,
      active: true,
    })),
  });

  await prisma.tryoutSections.createMany({
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: uuidv7() as string,
      code: `tryout-${i + 1}`,
      title: `Tryout ${i + 1}`,
      order: i + 1,
      active: true,
    })),
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
