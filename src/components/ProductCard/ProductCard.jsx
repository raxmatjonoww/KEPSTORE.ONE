import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => setIsLiked(!isLiked);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <strong className="product-price">${product.price}</strong>
        <div className="like-button-wrapper">
          <button
            onClick={handleLike}
            className={`like-button ${isLiked ? "liked" : ""}`}
          >
            {isLiked ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
