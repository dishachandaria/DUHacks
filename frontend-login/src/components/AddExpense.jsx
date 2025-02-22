import React, { useState } from "react";
import "../styles/AddExpense.css"; 

const AddExpense = () => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    name: "",
    amount: "",
    userId: localStorage.getItem("userId") || "default_user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error adding expense");
      alert("Expense added successfully!");
      setFormData({ date: "", category: "", name: "", amount: "", userId: formData.userId });
    } catch (error) {
      console.error(error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Expense Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;
