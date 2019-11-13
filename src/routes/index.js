const Auth = require("../middlewares/auth")


module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    })


    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    })
    app.post('/login', passport.authenticate('sesion-local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));


    app.get('/signup', (req, res) =>{
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    })

    app.post('/signup', passport.authenticate('registro-local', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile',Auth.isAuthentication, (req, res) => {
        res.render('profile', {
            user: req.user
        })
    })


    app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

