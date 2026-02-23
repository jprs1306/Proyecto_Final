import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Pedimos los productos a Render
        const prodResponse = await fetch('https://nexus-backend-api-a804.onrender.com/api/products');
        const prodData = await prodResponse.json();
        // Usamos .products porque tu API así lo envía
        setProducts(prodData.products || []); 

        // 2. Pedimos el tipo de cambio
        const currResponse = await fetch('https://open.er-api.com/v6/latest/USD'); 
        const currData = await currResponse.json();
        setExchangeRate(currData.rates.MXN); 
        
        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // <-- Esta llave y paréntesis cierran el useEffect

  // Si está cargando, mostramos el mensaje
  if (loading) {
    return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando sistema... ⏳</h2>;
  }

  // Aquí empieza tu diseño visual
  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h1>Catálogo de Productos 🎮</h1>
      {/* Aquí va tu mapeo de productos que ya tenías */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: '1px solid cyan', padding: '10px' }}>
            <img src={p.imageUrl} alt={p.name} style={{ width: '100%' }} />
            <h3>{p.name}</h3>
            <p>Precio: ${(p.price * exchangeRate).toFixed(2)} MXN</p>
          </div>
        ))}
      </div>
    </div>
  );
}; // <-- ESTA llave es la que debe cerrar TODO al final

export default Home;