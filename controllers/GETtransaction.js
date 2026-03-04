import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 2,
      type,
      category,
      date,
      startDate,
      endDate,
    } = req.query;

    const query = {};

    // Filtrer par type
    if (type) query.type = type;

    // Filtrer par catégorie
    if (category) query.category = category;

    // Filtrer par date précise
    if (date) {
      const exactDate = new Date(date);
      exactDate.setHours(0, 0, 0, 0);  //mettre l’heure à 00:00:00
      const nextDay = new Date(exactDate);  
      nextDay.setDate(nextDay.getDate() + 1);   //créer le jour suivant
      query.date = { $gte: exactDate, $lt: nextDay }; //filtrer entre 2 dates
    }

    // Filtrer par période (startDate & endDate)
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Pagination
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalTransactions = await Transaction.countDocuments(query);

    // Calcul dynamique du solde total
    const allTransactions = await Transaction.find({});
    const totalIncome = allTransactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = allTransactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    res.json({
      balance,
      totalTransactions,
      page: parseInt(page),
      limit: parseInt(limit),
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des transactions" });
  }
};