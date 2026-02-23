// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');


dotenv.config();
const app = express();

connectDB();


app.use(cors());
app.use(express.json()); 

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/currency', currencyRoutes);
app.use(errorHandler);


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando 🔧');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});