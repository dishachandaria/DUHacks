const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://userdb:pass123@user-expense.yibsn.mongodb.net/User-Expense?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

const User = mongoose.model("User", UserSchema);


// Expense Schema & Model
const ExpenseSchema = new mongoose.Schema({
  date: String,
  category: String,
  name: String,
  amount: Number,
});

const Expense = mongoose.model("Expense", ExpenseSchema);


//  Budget Schema (Includes Month & Year)
const BudgetSchema = new mongoose.Schema({
  month: String,
  year: Number,
  monthlyBudget: Number,
  yearlySavings: Number,
});

// Ensure unique month-year combinations
BudgetSchema.index({ month: 1, year: 1 }, { unique: true });

const Budget = mongoose.model("Budget", BudgetSchema);

// Register API
app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid Credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
  res.json({ token, role: user.role });
});




// Add an expense
app.post("/api/expenses", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// Get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

app.post("/add-budget", async (req, res) => {
  try {
    const { month, year, monthlyBudget, yearlySavings } = req.body;
    if (!month || !year || !monthlyBudget || !yearlySavings) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a budget for this month & year already exists
    const existingBudget = await Budget.findOne({ month, year });
    if (existingBudget) {
      return res.status(400).json({ message: "Budget for this month already exists" });
    }

    // Save new budget entry
    const newBudget = new Budget({ month, year, monthlyBudget, yearlySavings });
    await newBudget.save();

    res.status(201).json({ message: "Budget added successfully!", budget: newBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// **Fetch All Budgets API**
app.get("/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ year: -1, month: -1 });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));



