// src/middleware/adminMiddleware.js
module.exports = (req, res, next) => {
    // Si el usuario existe en la petición y su rol es exactamente 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // Le damos el pase
    } else {
        // Si no es admin, lo rebotamos con un error 403 (Prohibido)
        res.status(403).json({ 
            message: 'Acceso denegado: Se requieren permisos de Administrador para realizar esta acción.' 
        });
    }
};