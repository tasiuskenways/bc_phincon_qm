import { Request, Response } from "express";
import transactionServices from "../services/transaction.services";

class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const { totalPrice, cashierId, products } = req.body;
      const transaction = await transactionServices.createTransaction(
        cashierId,
        products
      );
      res.status(201).json({
        status: "success",
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const orderby = (req.query.orderby || "id") as string;
      const ordertype = (req.query.ordertype || "asc") as string;
      const transactions = await transactionServices.getTransactions(
        page,
        limit,
        orderby,
        ordertype
      );
      res.status(200).json({
        status: "success",
        message: "Transactions fetched successfully",
        data: {
          page,
          limit,
          total: transactions.length,
          transactions,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const transaction = await transactionServices.getTransactionById(id);
      res.status(200).json({
        status: "success",
        message: "Transaction fetched successfully",
        data: transaction,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await transactionServices.deleteTransaction(id);
      res.status(200).json({
        status: "success",
        message: "Transaction deleted successfully",
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { totalPrice } = req.body;
      const transaction = await transactionServices.updateTransaction(
        id,
        totalPrice
      );
      res.status(200).json({
        status: "success",
        message: "Transaction updated successfully",
        data: transaction,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });

      if (error.message === "Invalid cashier id") {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
        return;
      }
    }
  }

  async getTransactionsByCashier(req: Request, res: Response) {
    try {
      const cashierId = req.params.id;
      const transactions = await transactionServices.getTransactionsByCashier(
        cashierId
      );
      res.status(200).json({
        status: "success",
        message: "Transactions fetched successfully",
        data: transactions,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getTransactionsDetailById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const transactionDetail =
        await transactionServices.getTransactionDetailById(id);

      const product = transactionDetail.product as string;
      transactionDetail.product = JSON.parse(product);

      res.status(200).json({
        status: "success",
        message: "Transaction detail fetched successfully",
        data: transactionDetail,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new TransactionController();
