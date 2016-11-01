const AuthenticationController = {};

AuthenticationController.isAuthenticated = (req, res, next) => {
  if (req.user) {
    res.cookie('google_id', req.user.google_id);
    console.log(res.cookie)
    return next();
  }
  res.redirect('/');
}

module.exports = AuthenticationController;