const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,

  },
  scoreOfRating: {
    type: Number,
    required: false,
    default: 0,
  },
  numberOfRating: {
    type: Number,
    required: false,
    default: 0,
  },
});
restaurantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Restaurant", restaurantSchema);
