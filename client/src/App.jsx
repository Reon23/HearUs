import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "@/pages/Home"
// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import FileComplaint from "../pages/FileComplaint"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardHome from "@/pages/dashboard/Home"
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileComplaint from "./pages/FileComplaint";
// import Reports from "@/pages/dashboard/Reports"
// import Team from "@/pages/dashboard/Team"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/complaint" element={<FileComplaint />} /> */}

        {/* Dashboard layout route */}
        {isAuthenticated && 
          <Route path="/" element={<DashboardLayout />}>
            {/* Nested routes render inside <Outlet /> */}
            <Route index element={<Map />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="complaints" element={<FileComplaint />} />
            {/* <Route path="team" element={<Team />} /> */}
          </Route>
        }
      </Routes>
    </Router>
  );
}

export default App;
