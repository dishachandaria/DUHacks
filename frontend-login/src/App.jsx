import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./Login.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UserDashboard from "./components/UserDashboard.jsx";

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Register />} /> {/* Default route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;


