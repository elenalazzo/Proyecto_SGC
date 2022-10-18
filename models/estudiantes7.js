const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes7Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes7 = mongoose.model('Estudiante7', estudiantes7Schema);  //modificar

module.exports = Estudiantes7;  //modificar