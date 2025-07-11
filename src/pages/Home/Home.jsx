// src/pages/Home/Home.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Mahsulotlarni olishda xatolik: " + error.message);
    } else {
      setProducts(data);
    }
  }

  return (
    <div className="home-wrapper">
      <h1 className="home-title">🛍️ KEP-Store</h1>
      <p className="home-subtitle">WEAR YOUR ESSENCE</p>
      <p className="home-tagline">Пусть она говорит правду</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* About Us - Pastki qism */}
      <div className="about-section">
        <h2 className="about-title">О нас</h2>
        <p className="about-subtitle">ESSENCE — не вещь.</p>
        <p className="about-text">
          Это ты, собранный в форме. <br />
          Только тем, кто держит линию...
        </p>
      </div>
    </div>
  );
}

export default Home;
