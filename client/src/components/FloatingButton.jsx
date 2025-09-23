import React from "react";
import "./FloatingButton.css";
import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/complaints");
  };

  return (
    <button onClick={handleClick} className="Fbtn">
      +
    </button>
  );
};

export default FloatingButton;
