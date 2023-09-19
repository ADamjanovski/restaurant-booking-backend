const mongoose = require("mongoose");
const User = require("./User");
const Restaurants = require("./Restaurants");

const restaurantSchema = new mongoose.Schema({
  restaurant: {
    type: Restaurants,
    required : true,
  },
  date: {
    type: Date,
    required: true,
  },
  madeBy: {
    type: User,
    required : true,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
