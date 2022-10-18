const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes5Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes5 = mongoose.model('Estudiante5', estudiantes5Schema);  //modificar

module.exports = Estudiantes5;  //modificar