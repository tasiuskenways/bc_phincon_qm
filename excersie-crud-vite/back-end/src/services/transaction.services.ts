import { Prisma, PrismaClient } from "@prisma/client";
import { ProductTransaction } from "../types/product.type";

const prisma = new PrismaClient();

class TransactionService {
  async getTransactions(
    page: number,
    limit: number,
    orderby: string,
    ordertype: string
  ) {
    try {
      const transactions = await prisma.transaction.findMany({
        select: {
          id: true,
          totalPrice: true,
          cashier: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderby]: ordertype as Prisma.SortOrder,
        },
      });
      return transactions;
    } catch (error: any) {
      throw new Error("Failed to get transactions");
    }
  }

  async getTransactionById(id: string) {
    try {
      const transaction = await prisma.transaction.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          totalPrice: true,
          cashier: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      return transaction;
    } catch (error: any) {
      throw new Error("Failed to get transaction");
    }
  }

  async createTransaction(
    cashierId: string,
    products: { id: string; quantity: number }[]
  ) {
    try {
      await prisma.user.findUniqueOrThrow({
        where: { id: cashierId },
      });

      const productData: ProductTransaction[] = await Promise.all(
        products.map(async (product) => {
          const productData = await prisma.product.findUniqueOrThrow({
            where: { id: product.id },
          });

          if (productData.stock < product.quantity) {
            throw new Error(`Stock for product ${productData.name} not enough`);
          }

          return {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            quantity: product.quantity,
          };
        })
      );

      const totalPrice = productData.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      const transaction = await prisma.transaction.create({
        data: {
          totalPrice,
          cashier: {
            connect: {
              id: cashierId,
            },
          },
        },
      });

      await this.createTransactionDetail(transaction.id, productData);

      await this.updateProductStock(productData);

      return transaction;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  private async updateProductStock(products: ProductTransaction[]) {
    try {
      await Promise.all(
        products.map(async (product) => {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              stock: {
                decrement: product.quantity,
              },
            },
          });
        })
      );
    } catch (error: any) {}
  }

  private async createTransactionDetail(
    transactionId: string,
    products: ProductTransaction[]
  ) {
    try {
      const transactionDetail = await prisma.transactionDetail.create({
        data: {
          transactionId,
          product: JSON.stringify(products),
        },
      });
      return transactionDetail;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async getTransactionDetails() {
    try {
      const transactionDetails = await prisma.transactionDetail.findMany();
      return transactionDetails;
    } catch (error: any) {
      throw new Error("Failed to get transaction details");
    }
  }

  async getTransactionDetailById(id: string) {
    try {
      const transactionDetail =
        await prisma.transactionDetail.findUniqueOrThrow({
          where: { id },
        });
      return transactionDetail;
    } catch (error: any) {
      throw new Error("Failed to get transaction detail");
    }
  }

  async updateTransactionDetail(id: string, product: ProductTransaction[]) {
    try {
      const transactionDetail = await prisma.transactionDetail.update({
        where: { id },
        data: {
          product: JSON.stringify(product),
        },
      });
      return transactionDetail;
    } catch (error: any) {
      throw new Error("Failed to update transaction detail");
    }
  }

  async deleteTransaction(id: string) {
    try {
      await prisma.transaction.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error("Failed to delete transaction");
    }
  }

  async updateTransaction(id: string, totalPrice: number) {
    try {
      const transaction = await prisma.transaction.update({
        where: { id },
        data: { totalPrice },
      });
      return transaction;
    } catch (error: any) {
      throw new Error("Failed to update transaction");
    }
  }

  async getTransactionsByCashier(cashierId: string) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { cashier: { id: cashierId } },
      });
      return transactions;
    } catch (error: any) {
      throw new Error("Failed to get transactions by cashier");
    }
  }
}

export default new TransactionService();
