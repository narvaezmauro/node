var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const segundo = (new Date()).getSeconds();
    res.render('index', {
        title: 'NodeApi',
        textoSinEscapar: '<p>sin escapar</p>',
        condicion: {
            segundo: segundo,
            estado: segundo % 2 === 0
        },
        usuarios: [
            { nombre: 'Smith' },
            { nombre: 'Jones' }
        ]
    });
});

// parametros en la ruta

router.get('/parametros/:id', function(req, res, next) {
    const id = req.params.id;
    console.log(req.params);
});

// 
router.get('/parametros/piso/:piso/puerta/:puerta', function(req, res, next) {
    console.log('req.params', req.params);
    res.send('varios params');
});


// parametros en la query-string -http://localhost:3000/?variable=valor&variable2=valor2
router.get('/parametros', function(req, res, next) {
    console.log('req.query', req.query);
    res.send('ok con query');
});


// parametros en el body
router.post('/parametros', function(req, res, next) {
    console.log('req.body', req.body);
    res.send('ok, recibido post');
});



module.exports = router;
