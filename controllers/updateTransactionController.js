import Transaction from "../models/Transaction.js";

export const updateTransaction = async (req, res) => {
  try {
    const { title, category, type } = req.body;
    const { id } = req.params;

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
      title,
      category,
      type,
    });

    res.status(200).json({
      message: "Transaction updated successfully.",
      updatedTransaction,
    });
  } catch (error) {
    console.log("Error on updateTransaction", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
