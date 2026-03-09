import Transaction from "../models/Transaction.js";

export const getMonthStats = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Pipeline 1: totalIncome & totalExpense grouped by type
    const summaryStats = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Pipeline 2: total per category (expenses only) + percentage
    const categoryStats = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // Extract income & expense from summaryStats
    const totalIncome =
      summaryStats.find((s) => s._id === "income")?.total ?? 0;
    const totalExpense =
      summaryStats.find((s) => s._id === "expense")?.total ?? 0;
    const balance = totalIncome - totalExpense;

    // Add percentage to each category
    const categoryStatsWithPercentage = categoryStats.map((cat) => ({
      category: cat._id,
      total: cat.total,
      percentage:
        totalExpense > 0
          ? parseFloat(((cat.total / totalExpense) * 100).toFixed(2))
          : 0,
    }));

    res.json({
      month,
      year,
      totalIncome,
      totalExpense,
      balance,
      categoryStats: categoryStatsWithPercentage,
    });
  } catch (err) {
    next(err);
  }
};
