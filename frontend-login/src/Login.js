import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Auth.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      res.data.role === "admin" ? navigate("/admin") : navigate("/user");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Budget Planner - Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button className="auth-button" type="submit">Login</button>
        </form>
        <p className="auth-link">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;



