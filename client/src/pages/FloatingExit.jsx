import React from 'react'
import { useNavigate } from 'react-router-dom';
import exit from '../../public/exit.svg'
const FloatingExit = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // navigate to camera page
  };

  return (
    <button onClick={handleClick} className="newbtn">
      <img height={16} width={16} src={exit} alt="" />
    </button>
  );
}

export default FloatingExit