const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes8Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes8 = mongoose.model('Estudiante8', estudiantes8Schema);  //modificar

module.exports = Estudiantes8;  //modificar