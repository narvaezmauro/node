"use strict";

// funcion que retorna una promesa

function sleep(ms) {
    // Si hacemos una funcion que retorna una promesa la 
    //primera linea es devolver la promesa: return new Promise(resolve, reject);
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (true) {
                reject(new Error('Fatal de la muerte'));
            }

            resolve();
        }, ms);
    });
}

// consumimos la funcion que devuelve una promesa

const promesa = sleep(2000);

console.log(promesa);

promesa.then(() => {
    console.log('Promesa cumplida');
}).catch(err => {
    console.log('Error', err);
});
