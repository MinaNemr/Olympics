var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	score: Number
})

var boySchema = new mongoose.Schema({
	_id: Number,
	team: Number,
	score: Number,
	attended: Number
})

mongoose.model('Boy', boySchema);
mongoose.model('Team', teamSchema);