const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('x-auth-token') || req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Permiso denegado. No hay token.' });
    }

   
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guardamos los datos del admin para usarlos después
        next(); // Le damos el pase libre
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};