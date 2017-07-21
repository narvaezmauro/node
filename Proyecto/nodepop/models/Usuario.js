"use strict";

const mongoose = require('mongoose');

// Creamos un esquema

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    clave: String
});

mongoose.model('Usuario', usuarioSchema);

module.exports = mongoose.model('Usuario', usuarioSchema);