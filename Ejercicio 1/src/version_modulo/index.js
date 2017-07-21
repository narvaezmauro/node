"use strict;"

const fs = require('fs');
const async = require('async');

// require usa una ruta relativa a este fichero .js

const versionModulo = require('./versionModulo');

function versionModulos(callback) {
    // Esta ruta es relativa a la raiz del proyecto	

    fs.readdir('./node_modules', function(err, lista) {
        if (err) {
            callback(err);
            return;
        }

        // console.log(lista);

        // para cada string de la lista ejecutamos versionModulo
        // concat recibe: un array, la función a ejecutar con cada
        // elemento y un callback final
        async.concat(lista,
            // iterador
            function iterador(elemento, callbackIterador) {
                if (elemento === '.bin') {
                    callbackIterador(null);
                    return;
                }

                versionModulo(elemento, function(err, version) {
                    if (err) {
                        callbackIterador(err);
                        return;
                    }

                    // ya tenemos la version del modulo, la devolvemos
                    callbackIterador(null, { version: version, modulo: elemento });

                });
            },
            // finalizador

            callback

            // function finalizador(err, resultados) {
            // 	if(err){
            // 		callback(err);
            // 		return;
            // 	}
            //     callback(null, resultados);
            // }
        );

    });

}


versionModulos(function(err, datos) {
    if (err) {
        console.log('Hubo un error', err);
        return;
    }
    console.log('Los modulos son: ', datos);
});
