const HistoryController = {};
HistoryController.storage = {};

HistoryController.add = (roomID, songURL) => {
    if (HistoryController.storage[roomID] !== undefined) {
      HistoryController.storage[roomID].unshift(songURL);
    }
    else {
      HistoryController.storage[roomID] = [];
      HistoryController.storage[roomID].unshift(songURL);
    }
};

HistoryController.remove = (roomID, songURL) => {
    if (HistoryController.storage[roomID] === undefined) {
      throw new Error ('roomID not found.');
    }
    else if (HistoryController.storage[roomID].includes(songURL)) {
      let song = songURL;
      HistoryController.storage[roomID].splice(HistoryController.storage[roomID].indexOf(songURL), 1);
      return song;
    }
    throw new Error ('songURL not found.');
};

module.exports = HistoryController;