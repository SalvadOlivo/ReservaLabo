const express = require('express')
const router = express.Router();
const reservaController = require('../controllers/reserva')
const Auth = require("../middlewares/auth")


router.get('/formulario/:id&:fecha_i&:fecha_e',Auth.isAuthentication, reservaController.inicio)

router.post('/add', reservaController.registrarse)

router.get('/reserva/:id', reservaController.mostrarReserva)

router.get('/modificar/:id/:user', Auth.isAuthentication, reservaController.mostrarEdit)

router.post('/modificar/:id', reservaController.modificar)

router.get('/obtener/:id', Auth.isAuthentication, reservaController.mostrarxUser)

router.get('/obtener', reservaController.mostrar)

router.get('/delete/:user/:id',Auth.isAuthentication, reservaController.eliminar)

module.exports = router;