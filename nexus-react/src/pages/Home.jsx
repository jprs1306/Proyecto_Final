import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  // 1. Agregamos un nuevo espacio para guardar el precio del dólar
  const [exchangeRate, setExchangeRate] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 2. Pedimos los productos
        const prodResponse = await fetch('http://localhost:5000/api/products');
        const prodData = await prodResponse.json();
        setProducts(prodData.products); 

        // 3. Pedimos el tipo de cambio a tu API
        const currResponse = await fetch('http://localhost:5000/api/currency');
        const currData = await currResponse.json();
        setExchangeRate(currData.rates.MXN); // Guardamos cuánto vale 1 USD en MXN

        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando sistema... ⏳</h2>;

  return (
    <div style={{ color: 'white' }}>
      <h1>Catálogo de Productos 🎮</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #0ff', padding: '15px', borderRadius: '8px', background: '#222', display: 'flex', flexDirection: 'column' }}>
            
            {/* NUEVA IMAGEN: Si el producto no tiene foto, le ponemos un logo de control de Xbox por defecto */}
            <div style={{ width: '100%', height: '200px', backgroundColor: '#111', borderRadius: '4px', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img 
                src={product.imageUrl || 'https://cdn-icons-png.flaticon.com/512/13/13374.png'} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: product.imageUrl ? 'none' : 'invert(1)' }} 
              />
            </div>

            <h3 style={{ color: '#0ff', marginTop: 0 }}>{product.name}</h3>
            
            {/* 4. Mostramos el precio en Dólares */}
            <h2 style={{ color: '#0f0', marginBottom: '5px' }}>${product.price} USD</h2>
            
            {/* 5. Si la API de monedas respondió, calculamos y mostramos el precio en Pesos Mexicanos */}
            {exchangeRate && (
              <p style={{ color: '#aaa', marginTop: 0, fontSize: '0.9em' }}>
                Aprox. ${(product.price * exchangeRate).toFixed(2)} MXN
              </p>
            )}

            <p>Stock: {product.stock}</p>
            <button style={{ background: '#0ff', color: '#000', padding: '10px', border: 'none', cursor: 'pointer', width: '100%', fontWeight: 'bold', borderRadius: '4px' }}>
              Añadir al Carrito
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;