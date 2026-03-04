import express from 'express'
import { getTransactionById } from '../controllers/GetByIdTransaction.js'
import { deleteTransaction } from '../controllers/DeleteTransation.js';
import { getMonthStats } from '../controllers/StatistiqueController.js';
 const router=express.Router()




 router.delete("/:id", deleteTransaction);
 router.get("/stats",getMonthStats)
 router.get("/:id",getTransactionById)

export default router