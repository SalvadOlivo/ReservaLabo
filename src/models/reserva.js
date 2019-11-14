const Mongoose = require("mongoose");

const ReservaSchema = Mongoose.Schema({

  software: String,
  descripcion: String,
  tipo: String,
  laboratorio: {  type: String, default: "L-5"},
  duracion: Number,
  responsable: {  type: String, default: "root"},
  estado: String,
  numero_personas: Number,
  ultima_modificacion: Date,
  creada_por: {  type: String, default: "root"},
  modificada_por: {  type: String, default: "root"},
  fecha_i : Date,
  fecha_f : Date
});


(module.exports = Mongoose.model("reserva", ReservaSchema))
