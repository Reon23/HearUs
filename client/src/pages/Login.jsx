import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aadhaar validation
    const aadhaarRegex = /^[0-9]{12}$/;
    if (!aadhaarRegex.test(aadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    alert("Login successful! (Here you can add Aadhaar verification API call)");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder="Enter 12-digit Aadhaar"
              maxLength="12"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
