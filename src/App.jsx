// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import AdminLogin from "./pages/AdminLogin";
import "./App.css";

import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/add"
          element={user ? <AddProduct /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin"
          element={user ? <AddProduct /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
