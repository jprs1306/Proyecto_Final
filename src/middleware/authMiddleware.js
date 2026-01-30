// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Leer el token del header (se envía como "x-auth-token" o "Authorization")
    // Vamos a buscarlo en el header 'x-auth-token' para hacerlo simple
    const token = req.header('x-auth-token');

    // 2. Si no hay token, prohibir el paso
    if (!token) {
        return res.status(401).json({ message: 'Permiso denegado. No hay token.' });
    }

    // 3. Si hay token, intentar validarlo
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos los datos del usuario en la petición para usarlos luego
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};