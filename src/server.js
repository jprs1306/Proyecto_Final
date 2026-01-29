// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

connectDB();


app.use(cors());
// IMPORTANTE: Esta línea permite leer el "Body" de Postman. 
// Si esto falta o está abajo de las rutas, da el error "undefined".
app.use(express.json()); 

// --- ZONA DE RUTAS (¡ESTO VA DESPUÉS!) ---
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando 🔧');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});