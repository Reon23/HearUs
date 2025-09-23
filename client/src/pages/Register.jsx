import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ServerContext } from '../context/ServerContext.jsx';
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const { account, register } = useContext(ServerContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(name, email, password);

    if (!name || !email || !password) {
      alert("Please fill all details!");
      return;
    }

    await register({ name, email, password });
  };

  useEffect(() => {
    if (account) navigate("/");
  }, [account]);

  const handleDigiLocker = () => {
    alert("Redirecting to DigiLocker (integration goes here)");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="title">Register</h2>
        <p className="subtitle">
          Sign up using DigiLocker for secure Aadhaar-based verification
        </p>

        <form>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" onClick={handleRegister}>
            Register
          </button>
        </form>

        <div style={{ margin: "2rem", fontSize: "1.4rem", fontWeight: "bold" }}>
          or
        </div>

        <button className="digilocker-btn" onClick={handleDigiLocker}>
          Sign in with DigiLocker
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
