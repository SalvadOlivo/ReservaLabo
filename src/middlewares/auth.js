const Auth = {}

Auth.isAuthentication = function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

module.exports = Auth;
