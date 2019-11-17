const Laboratorio = require('../models/laboratorio')

const mostrar = async (req, res) => {
    const registros = await Laboratorio.find()
    res.status(200).json(registros)
}

const mostrarUno = async (req, res) => {
    const { id } = req.params;
    const registros = await Laboratorio.findById(id)
    res.status(200).json(registros)
}

const add = async (req, res) => {
    const lab = new Laboratorio(req.body);
    await lab.save();
    res.redirect('/lab')
}


module.exports = {
    mostrar,
    add,
    mostrarUno
}