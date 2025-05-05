import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductServices {
  async getProducts(
    page: number,
    limit: number,
    orderby: string,
    ordertype: string
  ) {
    try {
      const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          price: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          [orderby]: ordertype as Prisma.SortOrder,
        },
      });

      return products;
    } catch (error: any) {
      throw new Error("Failed to get products ");
    }
  }

  async getProductById(id: string) {
    try {
      const product = await prisma.product.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          price: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return product;
    } catch (error: any) {}
  }

  async createProduct(
    name: string,
    price: number,
    stock: number,
    categoryId: string
  ) {
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price,
          stock,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });

      return product;
    } catch (error: any) {
      throw new Error("Failed to create product ");
    }
  }

  async deleteProduct(id: string) {
    try {
      await prisma.product.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error("Failed to delete product ");
    }
  }

  async updateProduct(
    id: string,
    name?: string,
    price?: number,
    stock?: number,
    categoryId?: string
  ) {
    try {
      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = price;
      if (stock !== undefined) updateData.stock = stock;
      if (categoryId !== undefined) {
        updateData.category = {
          connect: {
            id: categoryId,
          },
        };
      }

      const product = await prisma.product.update({
        where: { id },
        data: updateData,
      });

      return product;
    } catch (error: any) {
      throw new Error("Failed to update product ");
    }
  }
}

export default new ProductServices();
