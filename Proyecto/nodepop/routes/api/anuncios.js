"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
// Le pedimos a mongoose el modelo de Anuncio
const Anuncio = mongoose.model('Anuncio');

// const basicAuth = require('../../lib/basicAuth');
// router.use(basicAuth('admin', 'god'));
const db = mongoose.connection.db;
// JSON web token
const jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth);

// GET /api/anuncios
router.get('/', (req, res, next) =>{

    console.log('Usuario autenticado con _id:', req.usuario_id);
    // Recogemos parametros de busqueda

    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;

    const tags = req.query.tags;

    const criterios = {};

    if (nombre){
        criterios.nombre = nombre;
    }
    if (venta){
        criterios.venta = venta;
    }
    if (precio){
        //10-50 buscará anuncios con precio incluido entre estos valores 
        switch(precio){
            case("10-50"):
                criterios.precio = {'$gte': '10', '$lte': '50' };
                break;
        // 10- buscará los que tengan precio mayor que 10
            case("10-"):
                criterios.precio = { '$gte':'10' };
                break; 
        // -50 buscará los que tengan precio menor de 50 { precio: { '$lte':'50' } }
            case("-50"):
                criterios.precio ={ '$lte':'50' };
                break;
        // 50 buscará los que tengan precio igual a 50 { precio: '50' }
            default:
                criterios.precio = precio;
                break;
        } 
    }
    if (tags){
        criterios.tags = tags;
    }
    

    // Recuperamos una lista de anuncios
    Anuncio.list(criterios, (err, anuncios) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result:anuncios});
    });
});

// // Recuperamos una imagen 
// router.get('/images/:photo', function(req, res, next) {
        
//         const foto = req.params.photo;
//         console.log('holaaa',foto);
        
//         db.anuncios.findOne({foto: foto}).exec((err, imagen)=>{
//             console.log('eyyyy', imagen);
//             if (!imagen){
//                 next(err);
//                 return;
//             }
//         res.json({success: true, result:imagen});
//         });
        
// });




// // Para buscar anuncios... 
// // 1.- Por nombre:
// router.get('/:nombre', function(req,res,next){
//     const _nombre = req.params.nombre;
//     Anuncio.find({_nombre: _nombre}).select("nombre").exec((err, anuncios) => {
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true, result:anuncios});
//     });
// });

// // 2.- Por tipo de anuncio (venta/busqueda):
// router.get('/:venta', function(req,res,next){
//     const _venta = req.params.venta;
//     Anuncio.find({_venta: _venta}).exec((err, anuncios) => {
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true, result:anuncios});
//     });
// });

// // 3.- Por precio:
// router.get('/:precio', function(req,res,next){
//     const _precio = req.params.precio;
//     Anuncio.find({_precio: _precio}).exec((err, anuncios) => {
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true, result:anuncios});
//     });
// });

// // 4.- Por tag:
// router.get('/:tag', function(req,res,next){
//     const _tag = req.params.tag;
//     Anuncio.find({_tag: _tag}).exec((err, anuncios) => {
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true, result:anuncios});
//     });
// });


// POST /api/anuncios

router.post('/', (req,res,next) => {
    const datosAnuncio = req.body; 
    console.log('recibido', datosAnuncio);
    // Creo instancia de anuncio
    const anuncio = new Anuncio(datosAnuncio);

    if(req.body.tags){
        if (req.body.tags!="work" && req.body.tags!="lifestyle" && req.body.tags!="motor" && req.body.tags!="mobile"){
            const error = new Error('Tag incorrercto, seleccione un tag válido: work/lifestyle/motor/mobile');
            next(error);
            return;
        }
    }

    // La guardo en la base de datos
    anuncio.save((err, anuncioGuardado) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, reslut: anuncioGuardado});
    });
});

// // PUT /api/anuncios

// router.put('/:id', (req,res,next) => {
//     const datosAnuncio = req.body;
//     const _id = req.params.id;

//     Anuncio.update({_id: _id}, datosAnuncio, (err) =>{
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true});
//     });
// });

// DELETE /api/anuncios

// router.delete('/:id', (req,res,next) =>{
//     const _id=req.params.id;

//     Anuncio.remove({_id: _id}, (err) => {
//         if (err){
//             next(err);
//             return;
//         }
//         res.json({success: true})
//     });
// });


module.exports = router;