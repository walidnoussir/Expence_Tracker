import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  limitAmount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Budget", budgetSchema);
