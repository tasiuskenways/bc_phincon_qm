import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
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
  const products = Array.from({ length: 1000 }, (_, i) => ({
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 1000 + 1).toFixed(2)),
    category: categories[i % categories.length],
    stock: Math.floor(Math.random() * 100) + 1,
  }));

  await prisma.product.createMany({
    data: products,
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
