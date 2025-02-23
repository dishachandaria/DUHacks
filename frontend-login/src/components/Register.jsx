import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import the CSS file

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { email, password, role });
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome to Expensify</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <select className="auth-select" onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="auth-button" type="submit">Register</button>
        </form>
        <p className="auth-link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;


