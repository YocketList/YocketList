const GuestController = {};

GuestController.list = [];

GuestController.addToList = (req, res, next) => {
  let currentUser = req.user.googleId;
  //query for fav list?
  GuestController.list.push(currentUser);
  next();
}

module.exports = GuestController;
