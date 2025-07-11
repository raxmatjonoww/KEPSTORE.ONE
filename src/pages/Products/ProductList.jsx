// src/pages/Products/ProductList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductList.css";

function ProductList() {
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
    <div className="product-page">
      <h2 className="product-page-title">🛒 Barcha Mahsulotlar</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
