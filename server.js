import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import updateTransactionRoute from "./routes/updateTransactionRoute.js";
import routesTransactions from "./routes/routesTransactions.js";
import categoryRoute from "./routes/categoryRoute.js";
import budgetRoute from "./routes/budgetRoute.js";
import transationRoute from "./routes/transationRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
const MONGODB_URL = process.env.MONGO_URI;

app.use("/api/transactions", updateTransactionRoute);
app.use("/api/transactions", transationRoute);
app.use("/api/", routesTransactions);
app.use("/api/", categoryRoute);
app.use("/api/", budgetRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server running on ${PORT}`);
});
