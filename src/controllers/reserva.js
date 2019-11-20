const Reserva = require('../models/reserva')
const User = require('../models/user')
const Lab = require('../models/laboratorio')
const fetch = require('node-fetch')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()


//FORMULARIO
const inicio = async (req, res) =>{
    const { id, fecha_i, fecha_e } = req.params;
    const user = await User.findById(id);
    const lab = await Lab.find();
    res.render('formulario', {
        user,
        lab,
        fecha_i,
        fecha_e
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------

//correo de confirmacion usuario
const correoConfirmar = (email, lab)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: `${email}`,
    from: 'reservaLab@distribuidor.com',
    subject: `Confirmacion de reserva de laboratorio ${lab}`,
    text: `Correo que confirma la reserva del laboratorio ${lab}. Espere a que su solicitud de reserva sea aprobada`,
    };
    sgMail.send(msg);
}

//correo de confirmacion admin
const correoConfirmarAdmin = (lab)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: '00078217@uca.edu.sv',
    from: 'reservaLab@distribuidor.com',
    subject: `Nueva reserva de laboratorio ${lab}`,
    text: `Correo que avisa que hay una nueva reserva del laboratorio ${lab}. Revisarla lo mas pronto posible`,
    };
    sgMail.send(msg);
}

//correo de aprobacion
const correoAprobar = (email, lab)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: `${email}`,
    from: 'reservaLab@distribuidor.com',
    subject: `Aprobacion de reserva de laboratorio ${lab}`,
    text: `Correo que comunica la aprobacion de la reserva del laboratorio ${lab}.`,
    };
    sgMail.send(msg);
}

//------------------------------------------------------------------------------------------------------------------------------------------

//REGISTRARSE
const registrarse = async (req, res) =>{
    const lab = await Lab.findById(req.body.laboratorio);
    const user = await User.findById(req.body.creada_por);
    const registro = new Reserva(req.body);
    correoConfirmar(user.email, lab.nombre);
    correoConfirmarAdmin(lab.nombre);
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
    const usuario_log = await User.findById(req.body.creada_por);
    const lab = await Lab.findById(req.body.laboratorio);
    if(req.body.estado == "Aprobada"){
        correoAprobar(usuario_log.email, lab.nombre);
    }
    await Reserva.update({
        _id: id
    }, req.body);
    res.redirect('/inicio');
    
}

const mostrarEdit = async (req, res) =>{
    const { id, user } = req.params;
    const reserva = await Reserva.findById(id);
    const usuario = await User.findById(user);
    const labs = await Lab.find();
    res.render('mod_reserva', {
        reserva,
        user: usuario,
        labs
    })
}

const eliminar = async (req, res) =>{
    const { id } = req.params;
    await Reserva.remove({_id: id});
    res.redirect('/inicio')
}

module.exports = {
    inicio, 
    registrarse,
    calendar,
    mostrarxUser,
    mostrar,
    modificar,
    mostrarEdit,
    eliminar
}