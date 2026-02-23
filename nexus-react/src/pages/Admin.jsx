import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [products, setProducts] = useState([]);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  // 1. Agregamos el estado para la categoría
  const [category, setCategory] = useState(''); 
  const [imageUrl, setImageUrl] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert(' Acceso denegado. Esta zona es solo para administradores.');
      navigate('/'); 
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-auth-token': token
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
          imageUrl // 2. ¡Enviamos la categoría al backend!
        })
      });

      if (response.ok) {
        alert(' ¡Producto agregado exitosamente a la base de datos!');
        fetchProducts(); 
        // 3. Limpiamos todos los campos, incluyendo categoría
        setName(''); setDescription(''); setPrice(''); setStock(''); setCategory('');setImageUrl('');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={{ color: 'white', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#f0f', margin: 0 }}>Panel de Control Admin 👑</h1>
        <button onClick={handleLogout} style={{ background: '#ff4444', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #f0f' }}>
          <h2 style={{ color: '#f0f', marginTop: 0 }}>Agregar Nuevo Producto</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Nombre (ej. RTX 5090)" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555' }} />
            <input type="text" placeholder="Categoría (ej. Periféricos)" value={category} onChange={e => setCategory(e.target.value)} required style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555' }} />
            <input type="text" placeholder="URL de la imagen (Link)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555' }} />
            <textarea placeholder="Descripción del producto..." value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555', minHeight: '80px' }} />
            <input type="number" placeholder="Precio en USD (ej. 1500)" value={price} onChange={e => setPrice(e.target.value)} required style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555' }} />
            <input type="number" placeholder="Stock disponible" value={stock} onChange={e => setStock(e.target.value)} required style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #555' }} />
            <button type="submit" style={{ background: '#f0f', color: '#000', padding: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              + Guardar en Base de Datos
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ color: '#0ff', marginTop: 0 }}>Inventario Actual</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto' }}>
            {products.map(p => (
              <div key={p._id} style={{ background: '#222', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #0ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff', fontSize: '18px' }}>{p.name}</strong>
                  <div style={{ color: '#aaa', fontSize: '14px' }}>Categoría: {p.category || 'N/A'} | Precio: ${p.price} | Stock: {p.stock}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;