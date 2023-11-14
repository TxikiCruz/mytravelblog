const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema ({
  user: {type:String},
  experience: {type: String, required: true},
  date: { type: Date, default: Date.now },
  content: {type: String}
});

module.exports =  mongoose.model('comments', commentSchema);
