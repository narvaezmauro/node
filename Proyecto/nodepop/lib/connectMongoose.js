"use strict;"

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const conn = mongoose.connection;

conn.on('err', (err) => {
   console.log('Error de conexon', err);
   process.exit(1); 
});

conn.once('open', () => {
    console.log('Conectado a MongoDB.');
});

// Realizamos la conexion

mongoose.connect('mongodb://localhost/Nodepop');

// no necesitamos exportar la conexion ya que 
// mongoose la exporta por nosotros

