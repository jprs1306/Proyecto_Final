import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Traer productos de la nube (Render)
        const prodResponse = await fetch('https://nexus-backend-api-a804.onrender.com/api/products');
        const prodData = await prodResponse.json();
        setProducts(prodData.products || []);

        // 2. Traer tipo de cambio real
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
  }, []);

  if (loading) {
    return <h2 style={{ color: '#00ffff', textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>Sincronizando con la base de datos... ⏳</h2>;
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'white', marginBottom: '30px', fontSize: '2.5rem' }}>
        Catálogo de Productos <span role="img" aria-label="controller">🎮</span>
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '25px' 
      }}>
        {products.map((p) => (
          <div key={p._id} style={{ 
            backgroundColor: '#1a1a1a', 
            border: '2px solid #333', 
            borderRadius: '8px',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            {/* Contenedor de Imagen */}
            <div style={{ width: '100%', height: '200px', backgroundColor: '#000', marginBottom: '15px', borderRadius: '4px', overflow: 'hidden' }}>
              <img 
                src={p.imageUrl} 
                alt={p.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>

            {/* Info del Producto */}
            <h3 style={{ color: '#00ffff', margin: '10px 0', fontSize: '1.2rem' }}>{p.name}</h3>
            
            <div style={{ marginTop: 'auto' }}>
              <p style={{ color: '#00ff00', fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>
                ${p.price} USD
              </p>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 10px 0' }}>
                Aprox. ${(p.price * exchangeRate).toFixed(2)} MXN
              </p>
              
              <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '15px' }}>
                Stock: {p.stock}
              </p>

              <button style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#00ffff', 
                border: 'none', 
                borderRadius: '5px', 
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                color: '#000'
              }}>
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;