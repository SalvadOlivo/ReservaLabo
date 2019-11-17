const express = require('express')
const router = express.Router();
const reservaController = require('../controllers/reserva')


router.get('/formulario/:id', reservaController.inicio)

router.post('/add', reservaController.registrarse)

router.get('/calendario', reservaController.calendar)

router.get('/modificar/:id/:user', reservaController.mostrarEdit)

router.post('/modificar/:id', reservaController.modificar)

router.get('/obtener/:id', reservaController.mostrarxUser)

router.get('/obtener', reservaController.mostrar)

module.exports = router;