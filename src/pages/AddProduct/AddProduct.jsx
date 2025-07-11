// src/pages/AddProduct/AddProduct.jsx
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !imageFile) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    const cleanName = imageFile.name
      .replace(/\s+/g, "-")
      .replace(/[^\w.-]/gi, "");

    const fileName = `${Date.now()}-${cleanName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert("Ошибка при загрузке изображения: " + uploadError.message);
      return;
    }

    const imageUrl = `https://varxekqkpcmwxqzciaxe.supabase.co/storage/v1/object/public/products-images/${fileName}`;

    const { error: insertError } = await supabase.from("products").insert([
      {
        title,
        price,
        description,
        image: imageUrl,
      },
    ]);

    if (insertError) {
      alert("Ошибка при добавлении продукта: " + insertError.message);
    } else {
      alert("✅ Продукт успешно добавлен!");
      navigate("/admin");
    }
  };

  return (
    <div className="add-product-container">
      <h2>➕ Добавить продукт</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Название продукта"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Описание продукта"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddProduct;
