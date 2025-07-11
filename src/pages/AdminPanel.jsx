// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function AdminPanel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Mahsulotlarni bazadan olish
  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
      alert("Xatolik: " + error.message);
    } else {
      setProducts(data);
    }
  }

  // Mahsulotni o‘chirish
  async function deleteProduct(id) {
    const confirmDelete = window.confirm("Haqiqatan ham o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("O‘chirishda xatolik: " + error.message);
    } else {
      fetchProducts(); // yangilash
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👨‍💼 Admin Panel</h2>
      <Link to="/admin/add" style={{ display: "inline-block", margin: "1rem 0", color: "#1a5bff" }}>
        ➕ Yangi mahsulot qo‘shish
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", width: "250px" }}>
            <img src={product.image} alt={product.title} width="100%" style={{ borderRadius: "8px" }} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <strong>${product.price}</strong>
            <div style={{ marginTop: "0.5rem" }}>
              <button
                onClick={() => deleteProduct(product.id)}
                style={{ marginRight: "10px", backgroundColor: "#e74c3c", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px" }}
              >
                ❌ O‘chirish
              </button>
              <Link
                to={`/admin/edit/${product.id}`}
                style={{ backgroundColor: "#3498db", color: "white", padding: "6px 10px", borderRadius: "4px", textDecoration: "none" }}
              >
                ✏️ Tahrirlash
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
