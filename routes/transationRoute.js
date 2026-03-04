import express from 'express'
import { getTransactionById } from '../controllers/GetByIdTransaction.js'
import { deleteTransaction } from '../controllers/DeleteTransation.js';
import { getMonthStats } from '../controllers/StatistiqueController.js';
 const router=express.Router()




router.get("/:id",getTransactionById)
router.delete("/:id", deleteTransaction);
router.get("/stats",getMonthStats)

export default router