"use strict;"

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'didimo.es',
    user: 'usuariocurso',
    password: 'us3r',
    database: 'cursonode'
});

conexion.connect();

conexion.query('SELECT * FROM agentes', function(err, filas, campos) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    filas.forEach(function(agente) {
        console.log(agente.idagentes, agente.name, agente.age);
    });
    conexion.end();
});
