// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// 1. Importar el middleware
const auth = require('../middleware/authMiddleware');

// Rutas Públicas (Cualquiera puede ver)
router.get('/', productController.getProducts);

// Rutas Privadas (Necesitas Token para pasar)
// 2. Agregamos 'auth' como segundo argumento
router.post('/', auth, productController.createProduct);

module.exports = router;