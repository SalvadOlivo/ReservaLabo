const Mongoose = require("mongoose");

const ReservaSchema = Mongoose.Schema({

  software: String,
  descripcion: String,
  tipo: String,
  laboratorio: {  type: Mongoose.Schema.Types.ObjectId, ref: "laboratorio"},
  duracion: Number,
  responsable: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  estado: String,
  numero_personas: Number,
  ultima_modificacion: Date,
  creada_por: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  modificada_por: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  fecha_inicio : Date,
  fecha_fin : Date,
  repeticion: {type: String, dia: String,fecha_tope: Date, numero_semana: Integer}
});


(module.exports = Mongoose.model("reserva", ReservaSchema))
