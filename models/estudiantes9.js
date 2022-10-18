const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiantes9Schema = new Schema ({  //modificar
    Nombres: String,
    Apellidos: String,
    Seccion: String
});

const Estudiantes9 = mongoose.model('Estudiante9', estudiantes9Schema);  //modificar

module.exports = Estudiantes9;  //modificar