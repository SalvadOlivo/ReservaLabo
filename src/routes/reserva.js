const express = require('express')
const router = express.Router();
const reservaController = require('../controllers/reserva')


router.get('/formulario', reservaController.inicio)

router.post('/add', reservaController.registrarse)

router.get('/calendario', reservaController.calendar)

router.get('/obtener', reservaController.mostrar)

module.exports = router;