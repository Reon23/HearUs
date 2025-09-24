// src/pages/DigilockerCallback.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function DigilockerCallback() {
  const [status, setStatus] = useState("Processing...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("access_token");
    if (!token) {
      setStatus("No token received. Mock flow failed.");
      return;
    }

    // Fetch userinfo from backend
    const fetchUser = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/auth/digilocker/userinfo", {
        // headers: {
        // Authorization: `Bearer ${token}`,
        // },
        // });

        const { user } = res.data;
        // Here you would: create or login user in your own backend, store session, etc.
        // For demo we'll store in localStorage and navigate to dashboard
        localStorage.setItem("hearus_user", JSON.stringify({ ...user, token }));
        setStatus("Verification successful. Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } catch (err) {
        console.error(err);
        setStatus("Failed to fetch user info from mock server.");
      }
    };

    fetchUser();
  }, [location, navigate]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Digilocker Callback</h2>
      <p>{status}</p>
    </div>
  );
}
