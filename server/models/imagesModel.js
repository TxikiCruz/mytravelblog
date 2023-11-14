const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  title: String,
  featured: Boolean,
  pathname: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("images", imagesSchema);
