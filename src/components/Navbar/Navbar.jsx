// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
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
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ KEP-Store
        </Link>

        <div className="navbar-links">
          {!user ? (
            <Link to="/admin/login" className="navbar-link">
              Admin Login
            </Link>
          ) : (
            <>
              <span className="admin-text">✅ Admin kirdi</span>
              <Link to="/admin/add" className="navbar-link">
                ➕ Tovar qo‘shish
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                🔓 Chiqish
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
