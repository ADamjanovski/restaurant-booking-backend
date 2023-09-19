const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },


});

module.exports = mongoose.model("Restaurant", restaurantSchema);
