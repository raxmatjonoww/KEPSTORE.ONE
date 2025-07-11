// src/components/Main1.jsx
import { Link } from "react-router-dom";
import "./Main1.css";

function Main1() {
  return (
    <div className="main-1">
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="home-title">WEAR YOUR ESSENCE</h1>
          <p className="subtitle">Пусть она говорит правду</p>

          <Link to="/products" className="btn explore-btn">
            Товары
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Main1;
