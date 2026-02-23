import { useState } from 'react';

const Cart = () => {
  // Simulamos un par de productos en el carrito para que no se vea vacío
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ryzen 7 7900x', price: 315, quantity: 1 },
    { id: 2, name: 'Regulador x3 pro', price: 120.5, quantity: 2 }
  ]);

  // Esta pequeña función calcula el costo total automáticamente
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ color: 'white', maxWidth: '800px', margin: '0 auto', marginTop: '40px' }}>
      <h1 style={{ color: '#0ff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Tu Carrito de Compras 🛒</h1>

      {cartItems.length === 0 ? (
        <p style={{ color: '#aaa', fontSize: '18px' }}>Tu carrito está vacío. ¡Ve a comprar algunos componentes!</p>
      ) : (
        <div>
          {/* Lista de productos en el carrito */}
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '15px 20px', marginBottom: '15px', borderRadius: '8px', borderLeft: '4px solid #0ff', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>{item.name}</h3>
                <p style={{ margin: '5px 0 0 0', color: '#aaa' }}>Cantidad: {item.quantity}</p>
              </div>
              <h2 style={{ margin: 0, color: '#0f0' }}>${item.price * item.quantity} USD</h2>
            </div>
          ))}

          {/* Sección del Total y Botón de Pago */}
          <div style={{ textAlign: 'right', marginTop: '30px', padding: '20px', background: '#111', borderRadius: '8px', border: '1px solid #333' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px' }}>Total a pagar: <span style={{ color: '#0f0' }}>${total} USD</span></h2>
            <button style={{ background: '#0ff', color: '#000', padding: '12px 25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', fontSize: '16px', transition: '0.3s' }}>
              Proceder al Pago 💳
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;