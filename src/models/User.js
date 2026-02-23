// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // NUEVO: Agregamos el rol del usuario
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user' // Por defecto, todos los que se registran son usuarios normales
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encriptar contraseña antes de guardar (quitamos el 'next' que te daba error antes)
UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);