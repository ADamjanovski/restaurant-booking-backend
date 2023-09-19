const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories : {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
    select: false,
  },
  scoreOfRating : {
    type : Number,
    required
  }

});

module.exports = mongoose.model("User", userSchema);
