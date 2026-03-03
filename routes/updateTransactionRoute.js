import express from "express";
import { updateTransaction } from "../controllers/updateTransactionController.js";
import {
  handleValidationErrors,
  validateTransactionBody,
} from "../middlewares/updateMiddleware.js";

const router = express.Router();

router.put(
  "/update/:id",
  handleValidationErrors,
  validateTransactionBody,
  updateTransaction,
);

export default router;
