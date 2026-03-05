import Transaction from "../models/Transaction.js";

export const getMonthStats = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    // ghadi n7ado start et end dyal mois

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = transactions
      .filter((tr) => tr.type === "income")
      .reduce((sum, tr) => sum + tr.amount, 0);

    const totalExpense = transactions
      .filter((tr) => tr.type === "expense")
      .reduce((sum, tr) => sum + tr.amount, 0);

    const balance = totalIncome - totalExpense;

    const expenses = transactions.filter((tr) => tr.type === "expense");
    // partie walid
    const categoryTotals = expenses.reduce((acc, tr) => {
      acc[tr.category] = (acc[tr.category] || 0) + tr.amount;
      return acc;
    }, {});

    // Percentage of each category relative to total expenses
    const categoryStats = Object.entries(categoryTotals).map(
      ([category, total]) => ({
        category,
        total,
        percentage:
          totalExpense > 0
            ? parseFloat(((total / totalExpense) * 100).toFixed(2))
            : 0,
      }),
    );

    res.json({
      month,
      year,
      totalIncome,
      totalExpense,
      balance,
      categoryStats,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
