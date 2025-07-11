// src/pages/Cart/Cart.jsx
import "./Cart.css";

function Cart({ cartItems }) {
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <div className="cart-wrapper">
      <h2>🛒 Ваша корзина</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Корзина пуста.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Итого: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}

export default Cart;
