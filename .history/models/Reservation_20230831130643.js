const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  madeBy : {
    type : Use
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
