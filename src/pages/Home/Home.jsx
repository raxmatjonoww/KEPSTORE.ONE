// src/pages/Home/Home.jsx
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-wrapper">
      <div className="hero-text">
        <h1 className="home-title">WEAR YOUR ESSENCE</h1>
        <p className="subtitle">Пусть она говорит правду</p>

        <Link to="/products" className="btn explore-btn">
          🔍 Mahsulotlarni Ko‘rish
        </Link>
      </div>
    </div>
  );
}

export default Home;
