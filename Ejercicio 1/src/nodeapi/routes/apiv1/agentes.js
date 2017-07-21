"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// Le pedimos a mongoose el modelo de Agente
const Agente = mongoose.model('Agente');

const basicAuth = require('../../lib/basicAuth');
//router.use(basicAuth('admin', 'god'));

// JSON web token
const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth);

// GET /apiv1/agentes
router.get('/', (req, res, next) =>{

    console.log('Usuario autenticado con _id:', req.usuario_id);
    // Recogemos parametros de busqueda

    const name = req.query.name;
    const age = req.query.age;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;

    const criterios = {};

    if (name){
        criterios.name = name;
    }
    if (age){
        criterios.age = age;
    }
    

    // Recuperamos una lista de agentes
    Agente.list(criterios, limit, skip, select, sort, (err, agentes) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result:agentes});
    });
});


router.get('/:id', function(req,res,next){
    const _id = req.params.id;
    Agente.findOne({_id: _id}).exec((err, agentes) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result:agentes});
    });
});

// POST /apiv1/agentes

router.post('/', (req,res,next) => {
    const datosAgente = req.body; 
    
    // Creo instancia de agente
    const agente = new Agente(datosAgente);

    // La guardo en la base de datos
    agente.save((err, agenteGuardado) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, reslut: agenteGuardado});
    });
});

// PUT /apiv1/agentes

router.put('/:id', (req,res,next) => {
    const datosAgente = req.body;
    const _id = req.params.id;

    Agente.update({_id: _id}, datosAgente, (err) =>{
        if (err){
            next(err);
            return;
        }
        res.json({success: true});
    });
});

// DELETE /apiv1/agentes

router.delete('/:id', (req,res,next) =>{
    const _id=req.params.id;

    Agente.remove({_id: _id}, (err) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true})
    });
});


module.exports = router;