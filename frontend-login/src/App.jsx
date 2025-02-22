import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./Login.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UserPage from "./components/UserPage.jsx";
import AddExpense from "./components/AddExpense";
import ViewHistory from "./components/ViewHistory.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* User Page with Nested Routes */}
        <Route path="/user" element={<UserPage />}>
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="view-history" element={<ViewHistory />} />
          <Route index element={<AddExpense />} /> {/* Default to Add Expense */}
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
