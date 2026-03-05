import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body); //req.body contient les données envoyées depuis Postman ou le frontend
    const savedTransaction = await transaction.save();
    res.status(201).json({
      message: "Transaction ajoutée avec succès",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout de la transaction" });
  }
};