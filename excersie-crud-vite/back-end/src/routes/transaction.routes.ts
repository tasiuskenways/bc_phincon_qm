import express from "express";
import transactionController from "../controllers/transaction.controller";
import { createTransactionValidator } from "../validator/transaction.validator";

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionById);
router.post(
  "/",
  createTransactionValidator,
  transactionController.createTransaction
);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);
router.get("/cashier/:id", transactionController.getTransactionsByCashier);
router.get("/detail/:id", transactionController.getTransactionsDetailById);

export default router;
