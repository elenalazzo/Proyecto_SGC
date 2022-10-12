const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calenSchema = new Schema({
    taskText:String,
    
    
});

const Calendarios = mongoose.model('Calendarios', calenSchema);

module.exports= Calendarios;