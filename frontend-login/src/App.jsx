import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./Login.jsx";
import AdminDashboard from "./components/AdminDashboard";
import UserPage from "./components/UserPage.jsx";
import AddExpense from "./components/AddExpense";
import ViewHistory from "./components/ViewHistory.jsx";
import AddBudget from "./components/AddBudget";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-budget" element={<AddBudget />} /> {/* Separate route for add-budget */}

        {/* User Routes */}
        <Route path="/user" element={<UserPage />}>
          <Route index element={<AddExpense />} /> {/* Default route inside /user */}
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="view-history" element={<ViewHistory />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;



