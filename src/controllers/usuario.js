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
const perfil = (req, res) => {
    res.render('profile', {
        user: req.user
    })
}

module.exports = {
    logout,
    inicio,
    sesion,
    registrarse,
    perfil
}