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
    const { user, id } = req.params;
    await User.update({
        _id: id
    }, req.body);
    res.redirect(`/users/${user}`);
}


const mostrar = async (req, res) => {
    const { id } = req.params;
    const usuarios = await User.find()
    const usuario_log = await User.findById(id);
    console.log(usuario_log._id)
    res.render('usuarios', {
        users : usuarios,
        user: usuario_log
    })
}

const modView = async (req, res) => {
    const usuario = await User.findById(req.params.id);
    const user1 = await User.findById(req.params.user);
    res.render('mod_user', {
        user: user1,
        usuario
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