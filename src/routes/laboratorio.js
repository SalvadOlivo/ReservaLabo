const express = require('express')
const router = express.Router();
const labController = require('../controllers/laboratorio')

router.get('/lab', labController.mostrar)
router.post('/lab', labController.add)
router.get('/lab/:id', labController.mostrarUno)

module.exports = router;