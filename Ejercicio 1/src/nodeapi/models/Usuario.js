const mongoose = require('mongoose');

// Creamos un esquema

const usuarioSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true
    },
    clave: String
});

mongoose.model('Usuario', usuarioSchema);