import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase
        .from("users")
        .select("full_name, phone, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profilni olishda xatolik:", error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("users")
      .update(profile)
      .eq("id", user.id);

    if (error) {
      alert("Yangilashda xatolik: " + error.message);
    } else {
      alert("Profil muvaffaqiyatli yangilandi");
      setEditing(false);
    }
  };

  if (loading) return <p className="profile-loading">⏳ Yuklanmoqda...</p>;

  return (
    <div className="profile-container">
      <h2>👤 Mening Profilim</h2>
      <div className="profile-box">
        <img
          src={
            profile.avatar_url ||
            "https://placehold.co/120x120?text=Avatar"
          }
          alt="Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <label>Ism:</label>
          {editing ? (
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.full_name || "—"}</p>
          )}

          <label>Telefon:</label>
          {editing ? (
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{profile.phone || "—"}</p>
          )}
        </div>

        <div className="profile-actions">
          {editing ? (
            <button onClick={handleSave} className="profile-btn save">
              💾 Saqlash
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="profile-btn edit">
              ✏️ Tahrirlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
