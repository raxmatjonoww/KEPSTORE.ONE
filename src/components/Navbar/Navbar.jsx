import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserShield, FaBars, FaTimes, FaShoppingCart, FaUserPlus, FaUser } from "react-icons/fa";
import { scroller } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ cartItems = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAdmin } = useAuth();

  const handleScroll = (target) => {
    setMenuOpen(false);
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
        <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>🛍️ Товары</Link>
        <span onClick={() => handleScroll("faq")} className="nav-link">❓ FAQ</span>
        <span onClick={() => handleScroll("kontakt")} className="nav-link">📞 Контакты</span>

        {user && !isAdmin && (
          <>
            <Link to="/cart" className="nav-icon-link" title="Корзина">
              <FaShoppingCart className="admin-icon" />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/profile" className="nav-icon-link" title="Профиль">
              <FaUser className="admin-icon" />
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/register" className="nav-icon-link" title="Регистрация">
              <FaUserPlus className="admin-icon" />
            </Link>
            <Link to="/admin/login" className="nav-icon-link" title="Вход">
              <FaUserShield className="admin-icon" />
            </Link>
          </>
        )}

        {user && isAdmin && (
          <>
            <span className="admin-indicator">✅ Админ</span>
            <Link to="/admin/add" className="nav-link">➕ Добавить товар</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="logout-btn">🔓 Выйти</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
