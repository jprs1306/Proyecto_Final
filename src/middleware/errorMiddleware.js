// src/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    // Tomamos el código de estado del error, o usamos 500 (Error interno) por defecto
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        // Solo mostramos la ruta completa del error si estamos en nuestra PC (desarrollo)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };