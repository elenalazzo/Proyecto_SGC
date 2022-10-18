const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes4Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes4 = mongoose.model('Estudiante4', estudiantes4Schema);  //modificar

module.exports = Estudiantes4;  //modificar