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

module.exports = router;
