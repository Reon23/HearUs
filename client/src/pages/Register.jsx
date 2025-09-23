import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleDigiLocker = () => {
    alert("Redirecting to DigiLocker (integration goes here)");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="title">Register</h2>
        <p className="subtitle">Sign up using DigiLocker for secure Aadhaar-based verification</p>

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
