// src/controllers/productController.js
const Product = require('../models/Product');

// 1. Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Busca todo en la BD
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        // Creamos un nuevo producto con los datos que vienen del "cuerpo" (body) de la petición
        const newProduct = new Product(req.body);
        
        // Lo guardamos en MongoDB
        const savedProduct = await newProduct.save();
        
        // Respondemos con el producto guardado
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};