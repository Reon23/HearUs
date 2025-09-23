import React from "react";
import FloatingButton from "./components/FloatingButton";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";


import Home from "./pages/Home";
import FileComplaint from "./pages/FileComplaint";

function App() {
  const handleClick = () => {
    alert("Floating button clicked!");
    // You can navigate to FileComplaint page or open a modal here
  };

  return (
    <Router>
      <Navbar />
      <div className="App">
        <h1 className="text-center mt-10">HearUs Platform</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<FileComplaint />} />
          <Route path="/LoginPage" element={<Login/>}/>
          {/* Add more routes here */}
        </Routes>

        <FloatingButton onClick={handleClick} />
      </div>
    </Router>
  );
}

export default App;
