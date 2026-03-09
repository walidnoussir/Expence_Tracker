import Transaction from "../models/Transaction.js";

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction non trouvée" });
    }

    res.status(200).json({
      message: "Transaction supprimée avec succès",
      deletedTransaction: transaction,
    });
  } catch (err) {
    next(err);
  }
};
