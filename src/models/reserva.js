const Mongoose = require("mongoose");

const ReservaSchema = Mongoose.Schema({

  software: String,
  descripcion: String,
  tipo: String,
  laboratorio: { type: Mongoose.Schema.Types.ObjectId, ref: "laboratorio" },
  duracion: Double,
  responsable: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  estado: String,
  numero_personas: Integer,
  ultima_modificacion: Date,
  creada_por: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  modificada_por: {  type: Mongoose.Schema.Types.ObjectId, ref: "user"},
  repeticion: {type: String, dia: String, fecha_inicio: Date, fecha_fin: Date, 
    hora_inicio: Date, hora_fin: Date, fecha_tope: Date, numero_semana: Integer}
});


(module.exports = Mongoose.model("reserva", ReservaSchema))
