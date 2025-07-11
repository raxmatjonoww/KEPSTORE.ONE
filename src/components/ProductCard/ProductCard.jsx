import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => setIsLiked(!isLiked);

  return (
    <div className="product-card glass-effect">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            onClick={handleLike}
            className={`like-button ${isLiked ? "liked" : ""}`}
            aria-label="Like"
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
