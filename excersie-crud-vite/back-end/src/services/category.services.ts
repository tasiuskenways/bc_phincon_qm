import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryServices {
  async getCategories() {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error: any) {
      throw new Error("Failed to get categories");
    }
  }

  async getCategoriesByName(name: string) {
    try {
      const categories = await prisma.category.findFirstOrThrow({
        where: { name },
      });
      return categories;
    } catch (error: any) {
      throw new Error("Invalid category");
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await prisma.category.findFirstOrThrow({
        where: { id },
      });
      return category;
    } catch (error: any) {
      throw new Error("Invalid category");
    }
  }

  async createCategory(name: string) {
    try {
      const category = await prisma.category.create({
        data: { name },
      });
      return category;
    } catch (error: any) {
      throw new Error("Failed to create category");
    }
  }

  async updateCategory(id: string, name: string) {
    try {
      const category = await prisma.category.update({
        where: { id },
        data: { name },
      });
      return category;
    } catch (error: any) {
      throw new Error("Failed to update category");
    }
  }

  async deleteCategory(id: string) {
    try {
      await prisma.category.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error("Failed to delete category");
    }
  }

  async getProductsByCategory(categoryId: string) {
    try {
      const products = await prisma.product.findMany({
        where: { category: { id: categoryId } },
      });
      return products;
    } catch (error: any) {
      throw new Error("Failed to get products by category");
    }
  }
}

export default new CategoryServices();
