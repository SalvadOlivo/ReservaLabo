const Mongoose = require("mongoose");

const laboratorioSchema = Mongoose.Schema({
    nombre: String,
    capacidad: Number,
    estado: Boolean
});

module.exports = Mongoose.model('Lab', laboratorioSchema);