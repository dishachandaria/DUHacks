import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewHistory.css";

const ViewHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then((response) => {
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [filter, expenses]);

  const filterExpenses = () => {
    const today = new Date();
    let filteredData = expenses;

    if (filter === "today") {
      filteredData = expenses.filter(exp => new Date(exp.date).toDateString() === today.toDateString());
    } else if (filter === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      filteredData = expenses.filter(exp => new Date(exp.date) >= startOfWeek);
    } else if (filter === "month") {
      filteredData = expenses.filter(exp => new Date(exp.date).getMonth() === today.getMonth() &&
        new Date(exp.date).getFullYear() === today.getFullYear());
    } else if (filter === "year") {
      filteredData = expenses.filter(exp => new Date(exp.date).getFullYear() === today.getFullYear());
    }

    setFilteredExpenses(filteredData);
  };

  return (
    <div className="card">
      <h2>Expense History</h2>
      
      {/* Filter Dropdown */}
      <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>

      {/* Expense Table */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Expense Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.name}</td>
                <td>₹{expense.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHistory;
