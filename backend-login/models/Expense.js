const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links expense to a user
  date: String,
  category: String,
  name: String,
  amount: Number,
});

module.exports = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
