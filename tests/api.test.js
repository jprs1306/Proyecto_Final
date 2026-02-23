// tests/api.test.js
const request = require('supertest');
const express = require('express');
const productRoutes = require('../src/routes/productRoutes');
const currencyRoutes = require('../src/routes/currencyRoutes');

// Simulamos tu servidor solo para las pruebas
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/currency', currencyRoutes);

describe('Pruebas de la API de Nexus Hardware', () => {

    // Prueba 1: Verificar que la API de monedas responde correctamente
    it('Debería obtener el tipo de cambio del dólar (GET /api/currency)', async () => {
        const res = await request(app).get('/api/currency');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('base', 'USD');
    });

    // Prueba 2: Probar la seguridad (No dejar crear productos sin Token)
    it('Debería denegar la creación de un producto si no hay token (POST /api/products)', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: "RTX 5090",
                price: 1500
            });
        
        // Esperamos un error 401 (No Autorizado) porque no le enviamos token
        expect(res.statusCode).toEqual(401); 
    });
});