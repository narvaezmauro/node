"use strict;"

// Creamos un constructor de objetos

function Fruta() {
    let nombre;
    this.setNombre = function(value) { nombre = value };
    this.setNombre = function(value) {
        return nombre };

}

// Creamos objeto fruta

const fruta = new Fruta();

fruta.setNombre('Limon');

console.log(fruta, fruta.getNombre());
