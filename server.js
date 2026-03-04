import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import  router from './routes/transationRoute.js'

dotenv.config();

const app = express();
app.use("/transaction", router)

app.use(express.json());
const MONGODB_URL = process.env.MONGO_URI;

try {
  await mongoose.connect(MONGODB_URL);
  console.log("connected to MongoDB");
} catch (err) {
  console.log(err);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
