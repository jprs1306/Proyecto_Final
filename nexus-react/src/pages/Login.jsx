import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Herramienta para cambiar de página automáticamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Le tocamos la puerta a tu Backend
    const response = await fetch('https://nexus-backend-api-a804.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      // 2. Si las credenciales son incorrectas, mostramos el error
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // 3. ¡Éxito! Guardamos el token y el rol en la memoria del navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      alert(`¡Bienvenido ${data.username}! Rol: ${data.role}`);

      // 4. Si es admin, lo mandaremos a su panel (que crearemos en el siguiente paso)
      if (data.role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/'); // Si es usuario normal, lo regresamos a la tienda
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#0ff', letterSpacing: '2px' }}>Acceso al Sistema 🔐</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#1a1a1a', padding: '40px', borderRadius: '8px', border: '1px solid #0ff', width: '320px', boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.2)' }}>
        
        {/* Si hay un error, lo mostramos en rojo */}
        {error && <p style={{ color: '#ff4444', textAlign: 'center', margin: 0 }}>{error}</p>}

        <label style={{ color: '#aaa', fontSize: '14px' }}>Correo Electrónico</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@nexus.com"
          style={{ padding: '12px', background: '#111', color: 'white', border: '1px solid #555', borderRadius: '4px', outline: 'none' }} 
          required 
        />

        <label style={{ color: '#aaa', fontSize: '14px', marginTop: '10px' }}>Contraseña</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ padding: '12px', background: '#111', color: 'white', border: '1px solid #555', borderRadius: '4px', outline: 'none' }} 
          required 
        />

        <button type="submit" style={{ background: '#0ff', color: '#000', padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', marginTop: '20px', fontSize: '16px' }}>
          Entrar a Nexus
        </button>
      </form>
    </div>
  );
};

export default Login;