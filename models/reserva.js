const Mongoose = require("mongoose");

const ReservaSchema = Mongoose.Schema({
  software: String,
  descripcion: String,
  tipo: String,
  sala: String,
  duracion: Double,
  responsable: String,
  confirmacion: Boolean,
  tipo_repeticion: String,
  dia_repeticion: String,
  fecha_inicio: Date,
  fecha_fin: Date,
  numero_personas: Integer,
  fecha_tope: Date,
  numero_semana: Integer,
  ultima_modificacion: Date,
  creada_por: String,
  modificada_por: String,
});


(module.exports = Mongoose.model("reserva", ReservaSchema))
