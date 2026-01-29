// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Intenta conectar usando la URL del archivo .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado Exitosamente a Nexus Hardware');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detiene la app si falla la base de datos
    }
};

module.exports = connectDB;