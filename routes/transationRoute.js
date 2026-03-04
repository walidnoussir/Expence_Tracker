import express from 'express'
import { getTransactionById } from '../controllers/GetByIdTransaction.js'
import { deleteTransaction } from '../controllers/DeleteTransation.js';
 const router=express.Router()




router.get("/:id",getTransactionById)
router.delete("/:id", deleteTransaction);


export default router