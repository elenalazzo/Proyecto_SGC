const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas8Schema = new Schema ({
    Nombres: String,
    Apellidos: String,
    NotaAC: Number,
    NotaAI: Number,
    NotaEX: Number,
    Periodo1: Number,
    NotaAC2: Number,
    NotaAI2: Number,
    NotaEX2: Number,
    Periodo2: Number,
    NotaAC3: Number,
    NotaAI3: Number,
    NotaEX3: Number,
    Periodo3: Number,
    Prom: Number
});

const Notas8 = mongoose.model('Nota8', notas8Schema);

module.exports = Notas8;