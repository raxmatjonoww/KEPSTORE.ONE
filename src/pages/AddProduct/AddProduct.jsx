import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !imageFile) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    // ❗️ Fayl nomini tozalash: bo‘sh joy, ruscha harflar, belgilar yo‘q qilinadi
    const cleanName = imageFile.name
      .replace(/\s+/g, "-")         // bo‘sh joy → -
      .replace(/[^\w.-]/gi, "");    // ruscha harf, () va boshqalar → o‘chadi

    const fileName = `${Date.now()}-${cleanName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.log(uploadError);
      alert("Rasm yuklashda xatolik: " + uploadError.message);
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
      alert("Mahsulotni qo‘shishda xatolik: " + insertError.message);
    } else {
      alert("Mahsulot muvaffaqiyatli qo‘shildi!");
      navigate("/admin");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>➕ Mahsulot qo‘shish</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{ background: "#1a5bff", color: "#fff", padding: "10px", border: "none", borderRadius: "5px" }}>
          Mahsulotni qo‘shish
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
