// src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import EditProduct from "./pages/EditProduct/EditProduct";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProductList from "./pages/Products/ProductList";
import { useEffect } from "react";
import { scroller } from "react-scroll"; // 🧠 react-scroll dan import qilamiz

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(scrollTo, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -80, // optional: agar sticky navbar bo‘lsa
        });
      }, 300);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
