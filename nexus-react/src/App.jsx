import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart'; 
import Admin from './pages/Admin';


function App() {
  return (
    <Router>
      {/* Contenedor principal con fondo negro Cyberpunk */}
      <div style={{ backgroundColor: '#000', minHeight: '100vh', margin: 0, fontFamily: 'sans-serif' }}>
        
        {/* Barra de Navegación */}
        <nav style={{ padding: '20px', background: '#111', color: '#0ff', borderBottom: '2px solid #0ff' }}>
          <h2 style={{ margin: '0 0 15px 0', letterSpacing: '2px' }}>NEXUS HARDWARE</h2>
          <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/login" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Iniciar Sesión</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Carrito</Link>
        </nav>

        {/* El "Cambiador" de páginas */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;