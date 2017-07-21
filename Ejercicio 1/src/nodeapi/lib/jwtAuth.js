"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config');

// Exportamos un middleware de autenticacion

module.exports = function(req, res, next){
    
    // Recoger el token jwt

    const token = req.body.token || req.query.token || req.get('x-access-token');

    // Si no me llega el token no autorizar
    if (!token){
        const error = new Error('necesitas un token de autenticacion');
        error.status = 401;
        next(error);
        return;
    }
    // Validar el token 

    jwt.verify(token, config.jwtSecret, (err, tokenDecodificado) => {
        // Si el token ha sido modificao o ha expirado nos dara este error
        if (err){    
            const error = new Error('Token no es valido');
            error.status = 401;
            next(error);
            return;
        }
        // el token es correcto
        req.usuario_id = tokenDecodificado.usuario_id;
        next();

    });
    
}