// src/pages/Products/ProductList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductList.css";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        setError("Ошибка при загрузке товаров.");
        console.error(error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list-wrapper">
        <h2 className="product-list-title">Наши товары</h2>

        {loading ? (
          <p className="product-status-text">Загрузка...</p>
        ) : error ? (
          <p className="product-status-text error">{error}</p>
        ) : products.length === 0 ? (
          <p className="product-status-text">Товары не найдены</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
