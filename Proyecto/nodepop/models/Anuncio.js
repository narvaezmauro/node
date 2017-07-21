"use strict";

const mongoose = require('mongoose');

// Creamos un esquema

const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },    
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number, 
        index: true
    },
    foto: String,    
    tags: {
        type: [String],
        //enum: ['work', 'lifestyle', 'motor', 'mobile'],
        index: true
    }
});

// Creamos metodo estatico en el modelo para 
// recuperar lista de anuncios con filtros

anuncioSchema.statics.list = function(criterios, /*limit, skip, select, sort,*/ callback){
    const query= Anuncio.find(criterios);

    // Añado limites
    // query.limit(limit);
    // query.skip(skip);
    // query.select(select);
    // query.sort(sort);
    

    // ejecuto la query
    query.exec(callback);
}


// Creamos el model de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// No necesitamos exportar el modelo porque
// podemos recuperarlo donde queramos con 
// mongoose.model('Anuncio')

module.exports = mongoose.model('Anuncio', anuncioSchema);