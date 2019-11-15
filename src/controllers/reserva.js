const Reserva = require('../models/reserva')


//FORMULARIO
const inicio = (req, res) =>{
    res.render('formulario');
}

//REGISTRARSE
const registrarse = async (req, res) =>{
    const registro = new Reserva(req.body);
    await registro.save();
    res.json(registro);
}

const calendar = (req, res) =>{
    res.render('calendario');
}

const mostrar = (req, res) =>{
    Reserva.find((err, registros) => {
        if(err) return res.status(500).json({mensaje: "Error"})
        return res.status(200).json(registros)
    })
}
const mostrarP = (req, res) =>{
    res.json([
    {
        'title': "prueba",
        'description' : 'es una prueba olv',
        'start' : "2019-11-13T00:00:00.000Z"
    }
    ])
}

module.exports = {
    inicio, 
    registrarse,
    calendar,
    mostrar,
    mostrarP
}