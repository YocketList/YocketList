const UserController = {};
UserController.updateUser = (req, res, next) => {
  User.update({ googleId: req.cookies.googleId }, {
    
  }) = {
    googleId: req.cookies.googleId,

  }
};

module.exports = UserController;
