"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// Le pedimos a mongoose el modelo de Usuario
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');
const config = require('../../config');

router.post('/login', (req, res, next) =>{
    // Recibimos credenciales

    const email = req.body.email;
    const clave = req.body.clave;

    // Buscamos el usuario en la base de datos

    Usuario.findOne({email: email}).exec((err, usuario) =>{
        if (err) {
            next(err);
            return;
        }
        if (!usuario){
            res.json({success: false, error: 'Crecenciales incorrectas'});
            return;
        }
    
    // Comprobamos su clave
    
        if (clave !== usuario.clave){
            res.json({success: false, error: 'Crecenciales incorrectas'});
            return;
        }

    // Creamos un token JWT

        jwt.sign({usuario_id: usuario._id}, config.jwtSecret, config.jwtConfig,
        (err, token) =>{
            if (err){
                next(err);
                return;
            }

    // Se lo devolvemos
            res.json({ success: true, token: token});
        });
    });
});

module.exports = router;