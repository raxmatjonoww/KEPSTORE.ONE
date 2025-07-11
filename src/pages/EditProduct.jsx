// src/pages/EditProduct.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) {
      alert("Xatolik: " + error.message);
    } else {
      setProduct(data);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    let imageUrl = product.image;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data: imgData, error: uploadError } = await supabase.storage
        .from("products-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Rasm yuklashda xatolik: " + uploadError.message);
        return;
      }

      imageUrl = supabase.storage
        .from("products-images")
        .getPublicUrl(fileName).data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("products")
      .update({
        title,
        price,
        description,
        image: imageUrl,
      })
      .eq("id", id);

    if (updateError) {
      alert("Xatolik: " + updateError.message);
    } else {
      alert("Mahsulot yangilandi!");
      navigate("/admin");
    }
  }

  if (!product) return <p>Yuklanmoqda...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✏️ Mahsulotni tahrirlash</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Nomi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Narxi"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Tavsifi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <div>
          <p>Joriy rasm:</p>
          <img src={product.image} alt="old" width="200" style={{ borderRadius: "8px" }} />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#1a5bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Saqlash
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
