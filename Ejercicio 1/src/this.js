function Coche() {
    this.ruedas = 4;
    this.cuantasRuedas = function() {
        console.log('tiene', this.ruedas);

    }
}

const coche = new Coche();

coche.cuantasRuedas();

const numRuedas = coche.cuantasRuedas.bind(coche);
numRuedas();

// setTimeout(coche.cuantasRuedas, 2000);

const camion = {
    ruedas: 8,
    cuantasRuedas: coche.cuantasRuedas.bind(coche)
}

camion.cuantasRuedas();
