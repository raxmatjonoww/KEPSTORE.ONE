// src/components/ProductCard/ProductCard.jsx
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card glass-effect">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            className="cart-button"
            onClick={onAddToCart}
            title="Добавить в корзину"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
