const User = require('../models/user')

//LOGOUT
const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

//INDEX
const inicio = (req, res) => {
    res.render('index');
}

//INICIAR SESION
const sesion = (req, res) => {
    res.render('login', {
        message: req.flash('loginMessage')
    });
}

//REGISTRARSE
const registrarse = (req, res) =>{
    res.render('signup', {
        message: req.flash('signupMessage')
    });
}

//PERFIL
const perfil = async (req, res) => {
    res.render('profile', {
        user: req.user
    })
}

//USUARIO LOGEADO
const logged = async (req, res) => {
    res.render('user_log', {
        user: req.user
    })
}

//MODIFICAR
const modificar = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    await User.update({
        _id: id
    }, req.body);
    res.redirect('/profile');
}


const mostrar = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const usuarios = await User.find()
    const usuario_log = await User.findById(id);
    res.render('usuarios', {
        users : usuarios,
        user: usuario_log
    })
}

const modView = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('mod_user', {
        user
    })
}

module.exports = {
    logout,
    inicio,
    sesion,
    registrarse,
    perfil,
    modificar,
    modView,
    logged,
    mostrar
}