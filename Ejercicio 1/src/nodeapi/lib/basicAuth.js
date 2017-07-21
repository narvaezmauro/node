"use strict";

const basicAuth = require('basic-auth');

// Este modulo exporta una funcion que recibe un usuario y contraseña
module.exports= (usuario, password) =>{

    // la funcion devuelve un middleware de autenticacion
    return (req, res, next) =>{
        // Pedimos a basicAuth que intente sacar credenciales
        const user = basicAuth(req);
        console.log('user', user);
        if (!user || user.name !== usuario || user.pass !== password){
            // Si no tengo credenciales, respuesta con cabecera pidiendolas
            res.set('WWW-authenticate', 'Basic realm=Athorization Required');
            res.send(401);
            return;
        }
        next();
    };
};