const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notas7Schema = new Schema ({
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

const Notas7 = mongoose.model('Nota7', notas7Schema);

module.exports = Notas7;