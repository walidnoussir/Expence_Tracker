import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json({
      message: "Transaction supprimée avec succès",
      deletedTransaction: transaction
    });

  } catch (err) {
    next(err);
  }
};