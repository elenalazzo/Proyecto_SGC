const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas9Schema = new Schema ({
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

const Notas9 = mongoose.model('Nota9', notas9Schema);

module.exports = Notas9;