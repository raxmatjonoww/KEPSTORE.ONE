// src/components/Navbar/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserShield } from "react-icons/fa"; // 🔐 ADMIN ICON
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Foydalanuvchi ma’lumotlarini olish
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    // Auth o‘zgarishini kuzatish
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Chiqish tugmasi
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // Chiqqandan keyin bosh sahifaga o‘tadi
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">KEP</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/products" className="nav-link">🛍️ Products</Link>

        {!user ? (
          <Link to="/admin/login" className="nav-icon-link" title="Admin Login">
            <FaUserShield className="admin-icon" />
          </Link>
        ) : (
          <>
            <span className="admin-indicator">✅ Admin</span>
            <Link to="/admin/add" className="nav-link">➕ Tovar qo‘shish</Link>
            <button onClick={handleLogout} className="logout-btn">🔓 Chiqish</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
