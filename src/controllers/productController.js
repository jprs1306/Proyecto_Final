const Product = require('../models/Product');

// 1. OBTENER PRODUCTOS (Con Paginación)
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            totalItems: totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            products: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor al obtener el inventario' });
    }
};

// 2. CREAR PRODUCTO (Esta es la que faltaba y causaba el crash)
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

// 3. ACTUALIZAR PRODUCTO
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// 4. ELIMINAR PRODUCTO
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};