// src/routes/currencyRoutes.js
const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

// Ruta PÚBLICA para consultar el dólar
router.get('/', currencyController.getExchangeRates);

module.exports = router;