// src/pages/AdminLogin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Ошибка входа: " + error.message);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="login-title">Вход в панель администратора</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Введите email ..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Введите пароль ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
