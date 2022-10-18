const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes3Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes3 = mongoose.model('Estudiante3', estudiantes3Schema);  //modificar

module.exports = Estudiantes3;  //modificar