import { Link as ScrollLink } from "react-scroll"; // ✅ react-scroll dan
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FaUserShield } from "react-icons/fa";
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
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ScrollLink
        to="glavnoe"
        smooth={true}
        duration={600}
        className="navbar-logo"
      >
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">KEP</span>
      </ScrollLink>

      <div className="navbar-links">
        <ScrollLink to="glavnoe" smooth={true} duration={600} className="nav-link">
          🏠 Главная
        </ScrollLink>
        <ScrollLink to="onas" smooth={true} duration={600} className="nav-link">
          📖 О нас
        </ScrollLink>
        <ScrollLink to="faq" smooth={true} duration={600} className="nav-link">
          ❓ FAQ
        </ScrollLink>
        <ScrollLink to="kontakt" smooth={true} duration={600} className="nav-link">
          📞 Контакты
        </ScrollLink>

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
