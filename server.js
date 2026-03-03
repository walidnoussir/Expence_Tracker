import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import updateTransactionRoute from "./routes/updateTransactionRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
const MONGODB_URL = process.env.MONGO_URI;

app.use("/api/transactions", updateTransactionRoute);

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
