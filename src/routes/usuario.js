const Auth = require("../middlewares/auth")
const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuario')
const passport = require('passport');

router.get('/', usuarioController.inicio)

router.get('/login', usuarioController.sesion)

router.post('/login', passport.authenticate('sesion-local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', usuarioController.registrarse)

router.post('/signup', passport.authenticate('registro-local', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile',Auth.isAuthentication, usuarioController.perfil)

router.get('/logout', usuarioController.logout);

router.get('/edit/:id', usuarioController.modView)

router.post('/edit/:id', usuarioController.modificar)


module.exports = router

    


