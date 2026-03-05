import express from "express";
import { createCategory } from "../controllers/createCategory.js";

const router = express.Router();

router.post("/category", createCategory);

export default router;
