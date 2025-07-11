import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserShield } from "react-icons/fa"; // Admin icon
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">KEP</span>
      </Link>

      <div className="navbar-links">
        {/* 🛍 Mahsulotlar sahifasi */}
        <Link to="/" className="nav-link">🛍 Mahsulotlar</Link>

        {/* 👮 Admin qismi */}
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
