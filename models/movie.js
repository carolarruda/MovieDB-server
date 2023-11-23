const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  runtimeMins: {
    type: Number,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model('Movie', MovieSchema)
