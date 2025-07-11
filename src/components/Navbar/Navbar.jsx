// src/components/Navbar/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserShield, FaBars, FaTimes } from "react-icons/fa";
import { scroller } from "react-scroll";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleScroll = (target) => {
    setMenuOpen(false); // Close menu on click
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: target } });
    } else {
      scroller.scrollTo(target, {
        duration: 700,
        smooth: "easeInOutQuart",
        offset: -80,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <span className="navbar-logo" onClick={() => handleScroll("glavnoe")}>
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">KEP</span>
      </span>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <span onClick={() => handleScroll("glavnoe")} className="nav-link">🏠 Главная</span>
        <span onClick={() => handleScroll("onas")} className="nav-link">📖 О нас</span>
        <span onClick={() => handleScroll("faq")} className="nav-link">❓ FAQ</span>
        <span onClick={() => handleScroll("kontakt")} className="nav-link">📞 Контакты</span>

        {!user ? (
          <Link to="/admin/login" className="nav-icon-link" title="Вход для админа">
            <FaUserShield className="admin-icon" />
          </Link>
        ) : (
          <>
            <span className="admin-indicator">✅ Админ</span>
            <Link to="/admin/add" className="nav-link">➕ Добавить товар</Link>
            <button onClick={handleLogout} className="logout-btn">🔓 Выйти</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
