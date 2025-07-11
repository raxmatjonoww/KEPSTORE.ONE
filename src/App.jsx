import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import EditProduct from "./pages/EditProduct/EditProduct";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProductList from "./pages/Products/ProductList";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
