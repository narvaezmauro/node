"use strict;"

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

function suenaTelefono(quien) {

    if (quien === 'madre') {
        return;
    }
    console.log('ring ring');
}

function vibrarTelefono() {
    console.log('brrr brrr');
}

eventEmitter.on('llamar telefono', suenaTelefono);
eventEmitter.on('llamar telefono', vibrarTelefono);
eventEmitter.emit('llamar telefono', 'madre');
