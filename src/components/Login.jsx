// src/components/Login.jsx
import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().length >= 4) {
      onLogin();
      setError("");
    } else {
      setError("Password must be at least 4 characters");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo-circle">🩺</div>
          <h1>TraKit PHC Access</h1>
          <p>Enter Admin Password to Continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="btn-primary" type="submit">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
