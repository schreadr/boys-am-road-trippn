const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Location", locationSchema);
