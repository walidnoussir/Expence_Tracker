import Transaction from "../models/Transaction.js";

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "transaction non trouvé " });
    }
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};
