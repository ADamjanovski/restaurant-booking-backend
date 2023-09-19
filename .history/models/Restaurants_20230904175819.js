const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories : {
    type: String,
    required: true,
  },
  email : {
    type : String,
    req
  },
  logo: {
    type: String,
    required: true,
    select: false,
  },
  scoreOfRating : {
    type : Number,
    required: false,
    default : 0,
  },
  numberOfRating: {
    type : Number,
    required : false,
    default: 0,
}

});

module.exports = mongoose.model("Restaurant", restaurantSchema);
