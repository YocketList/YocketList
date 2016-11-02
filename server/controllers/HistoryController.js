const Event = require('../model/eventmodel');

const HistoryController = {};
HistoryController.list = {};

HistoryController.addSong = (songURL, roomID) => {
  io.on('newsong'), (lastSongURL, roomID) => {
    if (HistoryController.list['roomID'] !== undefined) {
      HistoryController.list['roomID'].push(lastSongURL);
    }
    else {
      HistoryController.list['roomID'] = [];
      HistoryController.list['roomID'].push(lastSongURL);
    }
  }
};

// HistoryController.endEvent = (list, roomID) => {
//   add history to event in db

// }

// function HistoryController(roomID) {
//   this.roomID = roomID;
//   this.stack = [];
//   this.addSong = (songURL, io) => {
//     io.on('newsong'), (lastSongURL) => {
//     HistoryController.stack.push(lastSongURL);
//   }
// }
// }
 
module.exports = HistoryController;