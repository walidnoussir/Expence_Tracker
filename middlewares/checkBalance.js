import Transaction from "../models/Transaction.js";

export const checkBalance = async (req, res, next) => {
  try {
    const { type, amount } = req.body;

    if (type === "expense") {
      // Calcul du solde actuel
      const transactions = await Transaction.find({});
      const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

      const balance = totalIncome - totalExpense;

      if (amount > balance) {
        return res.status(400).json({
          error: "Solde insuffisant pour effectuer cette dépense",
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la vérification du solde" });
  }
};