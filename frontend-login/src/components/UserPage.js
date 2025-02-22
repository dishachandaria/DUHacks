import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css"; // Import CSS for styling

const UserPage = () => {
  return (
    <div className="container">
      {/* Navigation Bar (Always Visible) */}
      <nav className="navbar">
        <ul>
          <li><Link to="/user/add-expense">Add Expense</Link></li>
          <li><Link to="/user/view-history">View History</Link></li>
        </ul>
      </nav>

      {/* Render Nested Components Here */}
      <div className="content">
        <Outlet /> {/* This will load AddExpense or ViewHistory */}
      </div>
    </div>
  );
};

export default UserPage;
