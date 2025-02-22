const BudgetSchema = new mongoose.Schema({
    month: { type: String, required: true }, // Example: "January"
    year: { type: Number, required: true },  // Example: 2025
    monthlyBudget: { type: Number, required: true },
    yearlySavings: { type: Number, required: true }
  });
  
  // Ensure unique month-year combination
  BudgetSchema.index({ month: 1, year: 1 }, { unique: true });
  
  const Budget = mongoose.model("Budget", BudgetSchema);