const GuestController = require('../controllers/GuestController');
const EventController = require('../controllers/EventController');
const HistoryController = require('../controllers/HistoryController');

const QueueController = {};

QueueController.list = {};

// QueueController.addSong = (newSong) => {
//   io.emit('newdata', {songs: req.body, history: HistoryController.list, guests: GuestController.list});
//   res.status(200).send("");
//   res.end();
// }

// QueueController.endSong = (endedSong) => {
  
// }