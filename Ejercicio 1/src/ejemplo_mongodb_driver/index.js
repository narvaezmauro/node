"use strict;"

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost:27017/cursonode',
    function(err, db){
        if(err){
            console.log('Error ', err);
            process.exit(1);
        }
        db.collection('agentes').find().toArray(function(err, datos){
        if(err){
            console.log('Error ', err);
            process.exit(1);
        }
        console.log(datos);
        });
    });