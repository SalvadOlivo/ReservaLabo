const Reserva = require('../models/reserva')
const User = require('../models/user')
const Lab = require('../models/laboratorio')
const fetch = require('node-fetch')


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
    res.redirect('/inicio')
}

const calendar = (req, res) =>{
    res.render('calendario');
}

const mostrar = async (req, res) =>{
    const reservas = await Reserva.find()
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

const mostrarxUser = async (req, res) =>{
    const { id } = req.params;
    const usuario_log = await User.findById(id);
    const reservas = await Reserva.find();
    res.render('reservas', {
        reservas,
        user: usuario_log
    })
}

const modificar = async (req, res) =>{
    const { id }  = req.params;
    const { id_user } = req.body.modificada_por
    await Reserva.update({
        _id: id
    }, req.body)
    res.redirect(`/obtener/${id_user}`)
}

const mostrarEdit = async (req, res) =>{
    const { id, user } = req.params;
    const reserva = await Reserva.findById(id);
    const usuario = await User.findById(user);
    const response = await fetch('http://localhost:3000/lab');
    const labs = await response.json();
    console.log(reserva)
    res.render('mod_reserva', {
        reserva,
        user: usuario,
        labs
    })
}

module.exports = {
    inicio, 
    registrarse,
    calendar,
    mostrarxUser,
    mostrar,
    modificar,
    mostrarEdit
}