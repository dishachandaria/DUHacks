import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Keep the same styling

const AddBudget = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [yearlySavings, setYearlySavings] = useState("");
  const navigate = useNavigate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/add-budget", {
        month,
        year,
        monthlyBudget,
        yearlySavings,
      });

      alert(response.data.message);
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding budget");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h2 className="admin-title">Add Budget</h2>
        <form className="budget-form" onSubmit={handleSubmit}>
          <select
            className="budget-input"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Year"
            className="budget-input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Monthly Budget"
            className="budget-input"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Total Yearly Savings"
            className="budget-input"
            value={yearlySavings}
            onChange={(e) => setYearlySavings(e.target.value)}
            required
          />
          <button type="submit" className="dashboard-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddBudget;