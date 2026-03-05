import express from "express";
import { createBudget } from "../controllers/createBudgetController.js";

const router = express.Router();

router.post("/budget", createBudget);

export default router;
