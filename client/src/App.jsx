import React from "react";
import FloatingButton from "./components/FloatingButton";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import FileComplaint from "./pages/FileComplaint";
import Map from "./pages/Map";

// Inner component where hooks can be used
function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/complaint") {
      navigate("/"); // go home if already on map
    } else {
      navigate("/complaint"); // otherwise go to map
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<FileComplaint />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/map" element={<Map />} />
        </Routes>

        <FloatingButton onClick={handleClick} />
      </div>
    </>
  );
}

// Outer wrapper to provide Router
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

