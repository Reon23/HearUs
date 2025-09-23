import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "@/pages/Home"
// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import FileComplaint from "../pages/FileComplaint"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardHome from "@/pages/dashboard/Home"
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FileComplaint from "./pages/FileComplaint";
import MyMap from "./pages/Map";

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
     <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<FileComplaint />} />
          <Route path="/LoginPage" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <FloatingButton />
      </div>
    </>
  );
}

// Outer wrapper to provide Router
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
            <Route index element={<MyMap />} />
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
