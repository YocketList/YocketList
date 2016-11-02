const Event = require('../model/eventmodel');

const EventController = {};
EventController.list = [];

EventController.addToList = (req, res) => {
  Event.create(req.body)
  .then(data => {res.json(data)})
  .catch(err => {res.end(err)})
}

module.exports = EventController;
