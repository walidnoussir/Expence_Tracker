import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
  try {
    const budget = new Budget(req.body);
    const savedBudget = await budget.save();

    res.status(201).json({ message: "Budget created", savedBudget });
  } catch (error) {
    console.log("Error on createBudget", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
