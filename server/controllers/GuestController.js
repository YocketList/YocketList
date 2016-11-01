const GuestController = {};

GuestController.list = [];

GuestController.addToList = (req, res, next) => {
  console.log('GuestController')
  // let currentUser = req.user.google_id;
  // //query for fav list?
  // GuestController.list.push(currentUser);
  next();
}

module.exports = GuestController;
