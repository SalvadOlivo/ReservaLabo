const Auth = require("../middlewares/auth")
const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuario')
const passport = require('passport');

//pagina principal
router.get('/', Auth.isAuthenticationIndex, usuarioController.inicio)

//vista de login
router.get('/login', Auth.isAuthenticationIndex, usuarioController.sesion)

//verificar el inicio de sesion
router.post('/login', passport.authenticate('sesion-local', {
    successRedirect: '/inicio',
    failureRedirect: '/login',
    failureFlash: true
}));

//vista de registro
router.get('/signup', Auth.isAuthenticationIndex, usuarioController.registrarse)

//verificar que sean validos los datos al registrarse
router.post('/signup', passport.authenticate('registro-local', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

//cargar inicio logeado
router.get('/inicio',Auth.isAuthentication, usuarioController.logged)

//cargar perfil del usuario
router.get('/profile', Auth.isAuthentication,  usuarioController.perfil)

//cerrar sesion y regresar a la pagina principal
router.get('/logout', usuarioController.logout);

//vista de editar usuario
router.get('/edit/:id', Auth.isAuthentication, usuarioController.modView)

//actualizar el rol del usuario
router.post('/edit/:id', usuarioController.modificar)

//mostrar todos los usuarios
router.get('/users/:id', Auth.isAuthentication, usuarioController.mostrar)


module.exports = router

    


