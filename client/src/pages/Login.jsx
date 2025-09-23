import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Replace URL with your backend login endpoint
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        alert("Login successful!");
        // Optionally store token in localStorage
        navigate("/dashboard"); // redirect to dashboard
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) =>
              setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
