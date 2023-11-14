const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema ({
  experience: {type: String, required: true, ref: 'experiences' },
  user: {type: String},
  score: {type: Number}
});

module.exports =  mongoose.model('scores', scoreSchema);
