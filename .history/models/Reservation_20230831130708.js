const mongoose = require("mongoose");
const User = require("./User");
const Restaurants = require("./Restaurants");

const restaurantSchema = new mongoose.Schema({

    restaurant: {
        type : Restaurants
    }
  date: {
    type: Date,
    required: true,
  },
  madeBy : {
    type : User,
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
