"use strict;"

const creaAgente = function(nombre) {
    let edad = 0;
    return {
        setNombre: function(valor) {
            nombre = valor;
        },
        getNombre: function() {
            return nombre;
        },
        saluda: function() { console.log('Hola soy', nombre); }
    }
}

const neo = creaAgente('Neo');
console.log(neo.getNombre());

const trinity = creaAgente('Trinity');
console.log(neo.getNombre(), trinity.getNombre());

setTimeout(neo.saluda, 2000);
