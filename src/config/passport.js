const conexionLocal = require('passport-local').Strategy;

const usuario = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //registro de usuario
    passport.use('registro-local', new conexionLocal({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        usuario.findOne({'username': username}, function (err, user){
            if(err) {return done(err); }
            if(user) {
                return done(null, false, req.flash('signupMessage', 'El usuario ya existe'));
            } else {
                var nuevoUsuario = new usuario();
                nuevoUsuario.username = username;
                nuevoUsuario.password = nuevoUsuario.generateHash(password);
                nuevoUsuario.save(function (err){
                    if(err) {throw err;}
                    return done(null, nuevoUsuario);
                });
            }
        });
    }));

    //inicio de sesion
    passport.use('sesion-local', new conexionLocal({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        usuario.findOne({'username': username}, function (err, user){
            if(err) {return done(err); }
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'Datos incorrectos'))
            }
            if(!user.validatePassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Datos incorrectos'))
            }
            return done(null, user);
        });
    }));
}
