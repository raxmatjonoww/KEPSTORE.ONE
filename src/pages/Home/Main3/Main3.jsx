// src/components/Main3.jsx
import React, { useState } from "react";
import "./Main3.css";

const faqData = [
  {
    question: "Сколько длится доставка?",
    answer: "10–20 рабочих дней. Мы двигаем качественно, не срочно.",
  },
  {
    question: "Как заказать?",
    answer: "Ты выбираешь. Мы подтверждаем. 50/50 — и заказ пошёл.",
  },
  {
    question: "Что если нет нужного размера?",
    answer: "Пиши — найдём или предложим сильнее.",
  },
  {
    question: "Размеры маломерят?",
    answer:
      "Нет. Мы проверяем. Всё — по факту, не на глаз. Скинь свой рост, вес и размер — подберём точно.",
  },
  {
    question: "Можно ли заказать по фото?",
    answer: "Да. Скидывай — найдём, привезём, запакуем.",
  },
];

function Main3() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="main-3">
      <section className="faq-section">
        <h2 className="faq-title">FAQ</h2>

        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </div>
            <div
              className={`faq-answer-wrapper ${
                activeIndex === index ? "open" : ""
              }`}
            >
              <p className="faq-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Main3;
