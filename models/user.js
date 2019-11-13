const Mongoose = require("mongoose");

const usuarioSchema = Mongoose.Schema({
    nombre: String,
    username: String,
    password: String,
    rol: String
});

module.exports = Mongoose.model('users', usuarioSchema);


