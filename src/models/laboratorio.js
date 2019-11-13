const Mongoose = require("mongoose");

const laboratorioSchema = Mongoose.Schema({
    nombre: String,
    capacidad: Integer,
    estado: Boolean
});

module.exports = Mongoose.model('laboratorio', laboratorioSchema);