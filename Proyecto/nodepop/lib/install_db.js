"use strict";

console.log("STARTING SCRIPT");

var mongoose = require('mongoose');
const Usuario = require('../models/Usuario.js');
const Anuncio = require('../models/Anuncio.js');
const hash = require('../lib/hash');

/* Connect to the DB */
mongoose.connect('mongodb://localhost/Nodepop',function(){
    /* Drop the DB */
    const db = mongoose.connection.db;
    db.dropDatabase();

    // db.dropDatabase();

/*
 * Script que se encarga de poblar la base de datos  
 * 
 */

/*
    * //Host donde está nuestra base de datos, no tiene que ser nuestro equipo local, puede ser cualquier mongoDb.
    * //conn = new Mongo("localhost");
    * //Nombre de la base de datos que vamos a utilizar
    * //db = conn.getDB("antuandb");
    * 
    * // Limpiamos la base de datos por si existia algo antes
    * // db.dropDatabase();
    * 
*/

/*coleciones de nuestro modelo de datos*/
// db.createCollection("usuarios");
// db.createCollection("anuncios");

/* Usuarios */
console.log("***********creando usuarios*********");

// var a =1;
// var b =1;
function crearUsuarios(){
    return new Promise((resolve, reject) =>{
        const user1 = new Usuario ({
            
            "nombre": "Rober",
            "email": "rober@babel.es",
            "clave": "roberbabel"

        });

        const user2 = new Usuario ({
        
            "nombre" : "Blanca",
            "email": "blanca@babel.es",
            "clave": "blancababel"

        });

        const user3 = new Usuario ({
        
            "nombre" : "Pablo",
            "email": "pablo@babel.es",
            "clave": "pablobabel"

        });
        user1.clave = hash.encrypt(user1.clave);
        user2.clave = hash.encrypt(user2.clave);
        user3.clave = hash.encrypt(user3.clave);        
        user1.save();
        user2.save();
        user3.save();
        console.log("***********saving usuarios*********");
        resolve();
    }); 
};

console.log("***********creando anuncios*********");

/* anuncios */

function crearAnuncios(){
    
    return new Promise((resolve, reject) =>{
        const anuncio1 = new Anuncio ({
            
            "nombre" : "Coche",
            "venta" : true,
            "precio": 10,
            "foto": "../public/images/anuncios/coche.png",
            "tags": "motor"
        
        });

        const anuncio2 = new Anuncio ({
        
            "nombre" : "Smartphone",
            "venta" : false,
            "precio": 50,
            "tags": "mobile"
        
        });

        const anuncio3 = new Anuncio ({
        
            "nombre" : "Moto",
            "venta" : true,
            "precio": 50,
            "foto": "../public/images/anuncios/moto.png",
            "tags": ["motor", "lifestyle"]
        });
        anuncio1.save();
        anuncio2.save();
        anuncio3.save();
        console.log("***********saving anuncios*********");
        resolve();
    }); 
};

crearUsuarios();
crearAnuncios();

// }

// crearUsuarios().then(function(){
    //}).then(crearAnuncios).then(function(){
    // }).then(mongoose.connection.close()).then(function(){
    // }).then(console.log("SCRIPT FINISHED"));

// console.log("SCRIPT FINISHED");

});
     