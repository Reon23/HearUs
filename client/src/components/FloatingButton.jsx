import React from "react";
import './FloatingButton.css'

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="Fbtn"
    >
      +
    </button>
  );
};

export default FloatingButton;