import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="admin-card">
        <h2 className="admin-title">Admin Dashboard</h2>
        <div className="dashboard-options">
          <button className="dashboard-button" onClick={() => navigate("/view-analysis")}>
            View Analysis
          </button>
          <button className="dashboard-button" onClick={() => navigate("/add-budget")}>
            Add Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
