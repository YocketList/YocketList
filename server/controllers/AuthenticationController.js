const AuthenticationController = {};

AuthenticationController.isAuthenticated = (req, res, next) => {
  console.log('AuthenticationController', req.user)
  // if (req.user) {
      return next();
  // }

  // res.redirect('/');
}

module.exports = AuthenticationController;