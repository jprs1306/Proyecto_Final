// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Importamos a los dos guardias
const auth = require('../middleware/authMiddleware'); // Verifica que tengas cuenta
const admin = require('../middleware/adminMiddleware'); // Verifica que seas el jefe

// Ruta PÚBLICA (Todos pueden ver los productos)
router.get('/', productController.getProducts);

// Ruta PRIVADA y de ADMIN (Solo Admins pueden crear)
// Fíjate cómo ponemos "auth" y luego "admin" antes del controlador
router.post('/', auth, admin, productController.createProduct);

module.exports = router;