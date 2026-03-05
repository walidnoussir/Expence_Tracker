// import express from "express";
// import { addTransaction } from "../controllers/postTransactionController.js";
// import { transactionValidationRules, validateTransaction } from "../middlewares/validateTransaction.js";
// import { checkBalance } from "../middlewares/checkBalance.js";

// const router = express.Router();

// // POST : Ajouter une transaction
// router.post(
//   "/transactions",
//   transactionValidationRules(),
//   validateTransaction,
//   checkBalance,
//   addTransaction
// );

// export default router;
import express from "express";
import { addTransaction } from "../controllers/POSTtransaction.js";
import { getTransactions } from "../controllers/GETtransaction.js";
import { transactionValidationRules, validateTransaction } from "../middlewares/validateTransaction.js";
import { checkBalance } from "../middlewares/checkBalance.js";

const router = express.Router();

// POST : Ajouter une transaction
router.post(
  "/transactions",
  transactionValidationRules(),
  validateTransaction,
  checkBalance,
  addTransaction
);

// GET : Lister les transactions avec pagination et filtres
router.get("/transactions", getTransactions);

export default router;