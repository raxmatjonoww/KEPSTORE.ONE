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
import AdminLogin from "./pages/AdminLogin/Login";
import ProductList from "./pages/Products/ProductList";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Auth/Register";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

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
          offset: -80,
        });
      }, 300);
    }
  }, [location]);

  return null;
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar cartItems={cartItems} />
        <ScrollHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🛍️ Products */}
          <Route
            path="/products"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />

          {/* ✅ Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <PrivateRoute adminOnly>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <PrivateRoute adminOnly>
                <EditProduct />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
