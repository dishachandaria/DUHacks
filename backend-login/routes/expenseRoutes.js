const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// Add Expense
router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// Get All Expenses
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});


// **Get Expense Analysis (Category-wise Expense Breakdown)**
router.get("/analytics/category", async (req, res) => {
  try {
    const analytics = await Expense.aggregate([
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
    ]);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error generating analytics", error });
  }
});

// **Get Monthly Expense Trends**
router.get("/analytics/monthly", async (req, res) => {
  try {
    const analytics = await Expense.aggregate([
      {
        $group: {
          _id: { $substr: ["$date", 0, 7] }, // Extract YYYY-MM from date
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error generating analytics", error });
  }
});


module.exports = router;
