// src/components/Main4.jsx
import "./Main4.css";

function Main4() {
  return (
    <div className="main-4">
      <section className="contact-section">
        <p className="contact-subtitle">
          Напиши нам в удобной соцсети — мы ответим быстро.
        </p>
        <h2 className="contact-title">Связь с нами</h2>

        <div className="contact-links">
          <a
            href="https://www.instagram.com/kepstore.one/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn instagram"
          >
            Instagram
          </a>

          <a
            href="https://t.me/Kepstoreone"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn telegram"
          >
            Telegram
          </a>
        </div>
      </section>
    </div>
  );
}

export default Main4;
