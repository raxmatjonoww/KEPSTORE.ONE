// src/pages/AdminLogin.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login xatolik: " + error.message);
    } else {
      alert("Admin muvaffaqiyatli kirdi!");
      navigate("/admin");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ background: "#1a5bff", color: "#fff", padding: "10px" }}>
          Kirish
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
