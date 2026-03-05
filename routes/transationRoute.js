import express from "express";
import { getTransactionById } from "../controllers/GetByIdTransaction.js";
import { deleteTransaction } from "../controllers/DeleteTransation.js";
import { getMonthStats } from "../controllers/StatistiqueController.js";
import {
  validateMonth,
  validationError,
  validationGetId,
} from "../middlewares/ValidationGetDeletStatistique.js";
const router = express.Router();

router.delete("/:id", validationGetId, validationError, deleteTransaction);
router.get("/stats", validateMonth, validationError, getMonthStats);
router.get("/:id", validationGetId, validationError, getTransactionById);

export default router;
