const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  made
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
