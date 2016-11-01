const UserController = {};

UserController.updateUser = (req, res, next) => {
  User.update({ google_id: req.user.id }, {
    username: req.body.username,
  }, (err) => {
    if (err) console.log(err);
    next();
  });
};

module.exports = UserController;
