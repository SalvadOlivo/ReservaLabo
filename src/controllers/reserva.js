const Reserva = require('../models/reserva')
const User = require('../models/user')
const Lab = require('../models/laboratorio')


//FORMULARIO
const inicio = async (req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    const lab = await Lab.find();
    res.render('formulario', {
        user,
        lab
    });
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

const mostrar = async (req, res) =>{
    await Reserva.find()
    .populate({path: 'laboratorio'})
    .exec((err, lab) => {
        if(err){
            res.status(500).send({mensaje: 'Error de conexion a la BD'})
        }else{
            User.populate(lab, {path: 'responsable'}, (err, docingreso) => {
                if(err) {
                    res.status(500).send({mensaje: 'Error en la peticion'})
                }else{
                    User.populate(docingreso,{path: 'creada_por'}, (err, final) => {
                        if(err){
                            res.status(500).send({mensaje: "F en el chat"})
                        }else{
                            User.populate(final, {path: 'modificada_por'}, (err, registros) => {
                                if(err){
                                    res.status(500).send("FF")
                                }else{
                                    res.status(200).send(registros)
                                }
                            });
                        } 
                    });
                }
            });
        }
    });
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