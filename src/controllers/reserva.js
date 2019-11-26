const Reserva = require('../models/reserva')
const User = require('../models/user')
const Lab = require('../models/laboratorio')
const fetch = require('node-fetch')
const sgMail = require('@sendgrid/mail');
const moment = require('moment')

require('dotenv').config()


//FORMULARIO
const inicio = async (req, res) =>{
    const { id, fecha_i, fecha_e } = req.params;
    console.log(fecha_e)
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
    const response = await fetch('http://localhost:3000/obtener', {
        method: 'GET'
    })
    const registros = await response.json();
    console.log(req.body.fecha_inicio)

    registros.forEach(element => {
        var lab = element.laboratorio._id
        if(req.body.laboratorio == lab){
            if((moment(req.body.fecha_inicio).isBetween(moment(element.fecha_inicio),moment(element.fecha_fin)))
                || moment(req.body.fecha_inicio).isSame(element.fecha_inicio)){
                res.render('after_reserva', {
                    message: {
                        titulo: "Hubo un error al crear la reserva",
                        cuerpo: `El laboratorio ${element.laboratorio.nombre} está ocupado en el horario establecido. Intente cambiando de laboratorio o de horario`
                    },
                    ok: false,
                    user
                })
            }else if (element.laboratorio.capacidad < req.body.numero_personas){
                res.render('after_reserva', {
                    message: {
                        titulo: "Hubo un error al crear la reserva",
                        cuerpo: `La capacidad maxima del laboratorio ${element.laboratorio.nombre} se ve superada. Intente cambiando de laboratorio o disminuyendo la capacidad a reservar`
                    },
                    ok: false,
                    user
                })
            }
        }
    });

    const registro = new Reserva(req.body);
    correoConfirmar(user.email, lab.nombre);
    correoConfirmarAdmin(lab.nombre);
    await registro.save();
    res.render('after_reserva', {
        message: {
            titulo: "Reserva creada correctamente",
            cuerpo: "Se le ha enviado un correo con la confirmacion de la reserva. Se le notificará cuando sea aprobada su reserva"
        },
        ok: true,
        user
    })
}

const mostrar = async (req, res) =>{
    const reservas = await Reserva.find()
    .populate({path: 'laboratorio'})
    .exec((err, lab) => {
        if(err){
            //error de conexion a la DB
            res.status(500).send({mensaje: 'Error de la conexion a la BD'})
            //e500.ejs
            //res.send(e500.ejs)
        }else{
            User.populate(lab, {path: 'responsable'}, (err, docingreso) => {
                if(err) {
                    //error con la peticion
                    res.status(502).send({mensaje: 'Error con la peticion'})
                    //e502.ejs
                }else{
                    User.populate(docingreso,{path: 'creada_por'}, (err, final) => {
                        if(err){
                            //F en el chat
                            res.status(500).send({mensaje: 'Error en el chat'})
                            //e500.ejs
                        }else{
                            User.populate(final, {path: 'modificada_por'}, (err, registros) => {
                                if(err){
                                    //error El servicio esta temporalmente no disponible
                                    res.status(503).send({mensaje: 'El servicio esta temporalmente no disponible'})
                                    //e503.ejs
                                }else{
                                    res.status(200).json(registros)
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
    console.log(req.params.id)
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
    res.redirect(`/obtener/${req.body.creada_por}`);
    
}

const mostrarEdit = async (req, res) =>{
    const { id, user } = req.params;
    const reserva = await Reserva.findById(id);
    const usuario = await User.findById(user);
    const labs = await Lab.find();
    res.render('mod_reserva', {
        reserva,
        user: usuario,
        labs,
        moment
    })
}

const eliminar = async (req, res) =>{
    const { user, id } = req.params;
    await Reserva.remove({_id: id});
    res.redirect(`/obtener/${user}`)
}

module.exports = {
    inicio, 
    registrarse,
    mostrarxUser,
    mostrar,
    modificar,
    mostrarEdit,
    eliminar
}