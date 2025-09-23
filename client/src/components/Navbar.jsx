import React from 'react';
import './Navbar.css';  


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/about">About</a></li>
        <li className="navbar-item"><a href="/dashboard">Dashboard</a></li>
        <li className="navbar-item"><a href="/complaint">Complaint</a></li>
      </ul>
      <button className="login-btn"><a href="/LoginPage">Login</a></button>
    </nav>
  );
}

export default Navbar;
