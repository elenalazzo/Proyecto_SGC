const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes6Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes6 = mongoose.model('Estudiante6', estudiantes6Schema);  //modificar

module.exports = Estudiantes6;  //modificar