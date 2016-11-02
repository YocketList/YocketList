const GuestController = {};
const User = require('../model/usermodel');

GuestController.list = [];

GuestController.addToList = (req, res, next) => {
  let currentUserID = req.cookies.google_id;
    User.findOne({google_id: currentUserID}, (err, user) => {
      if (err) { throw new Error(err); }
        GuestController.list.push(user.username);
        next();
    });
};

module.exports = GuestController;
