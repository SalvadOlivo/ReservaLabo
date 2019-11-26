const Auth = {}

Auth.isAuthentication = function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

Auth.isAuthenticationIndex = function isLoggedIndex (req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/inicio');
};


module.exports = Auth;
