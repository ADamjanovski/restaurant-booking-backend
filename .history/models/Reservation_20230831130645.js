const mongoose = require("mongoose");
const User = require("./User");

const restaurantSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  madeBy : {
    type : User
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
