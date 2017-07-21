"use strict";

// encadenando promesas

function conArroz(plato) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' arroz');
    });
}

function conAjo(plato) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' ajo');
    });
}

function con(plato, ingrediente) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' ' + ingrediente);
    });
}


const paella = 'paella con';


// para encadenar, cada funcion recibe el dato y devuelve 
// una promesa para que el siguiente .then() la escuche
conArroz(paella).then(function(plato) {
    return conAjo(plato);

}).then(conAjo).then(plato => {
    return con(plato, 'cigalas');

}).then(plato => {
    console.log(plato);
});
