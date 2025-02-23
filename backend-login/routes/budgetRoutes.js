const express = require("express");
const router = express.Router();
const Budget = require("../models/budget"); // Ensure this is correctly linked

// ✅ Fetch all budgets
router.get("/budgets", async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching budgets", error });
    }
});

// ✅ Add a new budget
router.post("/add-budget", async (req, res) => {
    try {
        const { month, year, monthlyBudget, yearlySavings } = req.body;
        if (!month || !year || !monthlyBudget || !yearlySavings) {
            return res.status(400).json({ message: "❌ All fields are required" });
        }

        // Check if a budget for this month & year already exists
        const existingBudget = await Budget.findOne({ month, year });
        if (existingBudget) {
            return res.status(400).json({ message: "❌ Budget for this month already exists" });
        }

        // Save new budget entry
        const newBudget = new Budget({ month, year, monthlyBudget, yearlySavings });
        await newBudget.save();

        res.status(201).json({ message: "✅ Budget added successfully!", budget: newBudget });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Server error", error });
    }
});

module.exports = router;



