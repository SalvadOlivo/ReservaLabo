const User = require('../models/user')

//GET ALL
const getAll = (req, res) =>{
     Registro.find((err, usuarios) => {
         if(err) return res.status(500).json({mensaje: "Error"})
         return res.status(200).json(usuarios)
     })
    
}

//GET ONE BY ID
const getOneById = (req, res) =>{
    Registro.findById(req.params.id, (err, usuario) =>{
        if(err) return res.status(500).json({mensaje: "Error"})
        return res.status(200).json(usuario)
    })
}

//POST
const insert = async (req, res) =>{
    let registro = new User({
        nombre: req.body.nombre,
        username : req.body.username,
        password : req.body.password,
        rol: req.body.rol
    })
    await registro.save()
    res.status(201).json({
        mensaje: "hola"
    })
    
}

//PUT
const update = (req, res) =>{
    
}

//DELETE
const erase = (req, res) =>{
    
}

module.exports = {
    getAll,
    getOneById,
    insert,
    update,
    erase
}