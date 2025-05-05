import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { v7 as uuidv7 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  // Clean tables first (order matters due to FK constraints)
  await prisma.transactionDetail.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categoryNames = [
    "Electronics",
    "Furniture",
    "Stationery",
    "Accessories",
    "Clothing",
    "Toys",
    "Books",
    "Sports",
    "Kitchen",
    "Garden",
  ];

  await prisma.category.createMany({
    data: categoryNames.map((name) => ({ name })),
  });

  // Fetch categories with their IDs
  const categories = await prisma.category.findMany();

  // Map category names to IDs
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.name, cat.id])
  );

  const saltRounds = bcryptjs.genSaltSync(10);

  // Create users
  const users: {
    id: string;
    username: string;
    password: string;
    role: Role;
  }[] = Array.from({ length: 10 }, (_, i) => {
    const id = uuidv7() as string;
    const password = bcryptjs.hashSync(
      `${id}${process.env.SECRET_KEY || ""}user${i + 1}`,
      saltRounds
    );
    return {
      id,
      username: `user${i + 1}`,
      password,
      role: Role.Cashier,
    };
  });

  const adminId = uuidv7() as string;
  const adminPassword = bcryptjs.hashSync(
    `${adminId}${process.env.SECRET_KEY || ""}admin`,
    saltRounds
  );
  users.push({
    id: adminId,
    username: "admin",
    password: adminPassword,
    role: Role.Admin,
  });

  await prisma.user.createMany({
    data: users,
  });

  // Create products with categoryId
  const products = Array.from({ length: 1000 }, (_, i) => {
    const categoryName = categoryNames[i % categoryNames.length];

    return {
      name: `Product ${i + 1}`,
      price: parseFloat((Math.random() * 1000 + 1).toFixed(2)),
      stock: Math.floor(Math.random() * 100) + 1,
      categoryId: categoryMap[categoryName],
    };
  });

  await prisma.product.createMany({
    data: products,
  });

  console.log("Tables cleaned and seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
