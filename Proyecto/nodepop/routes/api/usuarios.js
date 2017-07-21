"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// Le pedimos a mongoose el modelo de Usuario
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');
const config = require('../../config');
const hash = require('../../lib/hash');

router.post('/login', (req, res, next) =>{
    // Recibimos credenciales

    const nombre = req.body.nombre;
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
    
        if (hash.encrypt(clave) !== usuario.clave){
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


router.post('/', (req,res,next) => {
    const datosUsuario = req.body; 
    console.log('recibido', datosUsuario);
    // Creo instancia de usuario
    const usuario = new Usuario(datosUsuario);
    if (!req.body.nombre || !req.body.email || !req.body.clave){
        const error = new Error('Cree un usuario correcto: nombre, email y clave');
        next(error);
        return;
    }
    usuario.clave = hash.encrypt(req.body.clave);
    // La guardo en la base de datos
    usuario.save((err, usuarioGuardado) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, reslut: usuarioGuardado});
    });
});


module.exports = router;