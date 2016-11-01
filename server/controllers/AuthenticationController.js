const AuthenticationController = {};

AuthenticationController.isAuthenticated = (req, res, next) => {
console.log(profile, req.user)
  if (req.user.authenticated()) {
      return next();
  }

  res.redirect('/');
}

module.exports = AuthenticationController;