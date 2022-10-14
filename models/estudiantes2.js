const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes2Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Grado: String,
    Seccion: String
});

const Estudiantes2 = mongoose.model('Estudiante2', estudiantes2Schema);  //modificar

module.exports = Estudiantes2;  //modificar