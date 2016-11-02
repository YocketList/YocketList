const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
	google_id: {
    type: String,
    required: true
  },
	eventName: {
    type: String,
		unique: true,
    required: true
	},
	eventType: {
    type: String,
    required: true
	},
	eventPassword: {
    type: String,
    required: true
  },
	matchmaking: Boolean,
	eventHistory: {
		type : Array,
		"default" : []
	}

})

module.exports = mongoose.model('Event', Event);
