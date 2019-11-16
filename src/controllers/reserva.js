const Reserva = require('../models/reserva')


//FORMULARIO
const inicio = (req, res) =>{
    res.render('formulario');
}

//REGISTRARSE
const registrarse = async (req, res) =>{
    console.log(req.body)
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
        'daysOfWeek': ['5'],
        'startTime': '10:45:00',
        'endTime': '12:45:00',
        'starRecur' : '2019-11-13',
        'endRecur' : '2019-11-25',
        'description' : 'es una prueba olv',
    }
    ])
}

const modificar = async (req, res) =>{
    const { id }  = req.params;
    await Reserva.update({
        _id: id
    }, req.body)
    res.redirect('/obtener')
}

const mostrarMod = (req, res) =>{
    Reserva.deleteMany({}, (err)=>{
        res.status(200).send("F en el chat");
    });
}

module.exports = {
    inicio, 
    registrarse,
    calendar,
    mostrar,
    mostrarP,
    modificar,
    mostrarMod
}