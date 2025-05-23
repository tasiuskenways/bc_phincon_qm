import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean tables first (order matters due to FK constraints)
  await prisma.cart.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

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

  // Create users
  const users = Array.from({ length: 10 }, (_, i) => ({
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: `password${i + 1}`,
  }));

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
